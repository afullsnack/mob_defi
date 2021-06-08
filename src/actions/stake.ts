import {
  STAKE_CONFIG_ID,
  StakeProgram,
  StakeInstruction,
  Authorized,
  Lockup,
  PublicKey,
  Account,
  Transaction,
  sendAndConfirmTransaction,
  Connection,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { message } from "antd";
import { WalletAdapter } from "../contexts/wallet";

import { STAKE_PROGRAM_ID } from "../utils/ids";

import { notify } from "../utils/notifications";


/*

saving interface

*/
type TitleDefault = "New Savings";
type DescriptionDefault = "Enter description";
type SavingStatus = "active" | "activating" | "inactive" | "deactivating";

export interface SavingsProvider {
  title: string | TitleDefault,
  description: string | DescriptionDefault,
  amount: number,
  lockPeriod: number,
  rewardToken: string,
  stakePubKey?: string,
  status?: SavingStatus,
}

const stakeAccount = new Account();

export async function initStake(connection: Connection, wallet: WalletAdapter, opts: any) {

  
  console.log("opts", opts);
  let funds = Number(opts?.amount) * LAMPORTS_PER_SOL; //funds to send to the stake account from the wallet
  let lockPeriod = opts.lockDate;

  try {

    // Math.floor(lockPeriod / 1000)

    console.log("New stake public key", stakeAccount.publicKey.toBase58());
    
    if(!wallet?.publicKey) throw new Error("Wallet is not connected for stake");
    // defining and creating the staking code
    let transaction = new Transaction().add(
      StakeProgram.createAccount({
        authorized: new Authorized(wallet?.publicKey, wallet?.publicKey),
        fromPubkey: wallet?.publicKey,
        lamports: funds,
        stakePubkey: stakeAccount.publicKey,
        lockup: new Lockup(lockPeriod, Math.floor(lockPeriod/3600), wallet?.publicKey),
      })
    );
    
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash("max")
      ).blockhash;
      
      transaction.feePayer = wallet.publicKey;
      // transaction.addSignature(wallet?.publicKey, Buffer.from(stakeAccount.publicKey.toString()));
      transaction.partialSign(stakeAccount);
      transaction.sign(stakeAccount);
      transaction = await wallet.signTransaction(transaction);
      const isVerified = transaction.verifySignatures();
      if(!isVerified) throw new Error("Transaction is not verified");
      
      const txid = await connection.sendRawTransaction(transaction.serialize(), {preflightCommitment: "singleGossip"});
      
      // data.stakePubKey = stakeAccount.publicKey.toBase58();

      console.log(txid);

      notify({
        message: "Stake Created",
        description: "Staking account created and delegated",
        txid
      });

      return {stakePubkey: stakeAccount.publicKey.toBase58(), fund: funds };

      

      // setSaveData([...saveData, data]);
      
    } catch(err) {
      message.error(err.message || err.toString());
      console.log(err.message || err.toString());
    }

}

export async function delegateStake(connection: Connection, wallet: WalletAdapter) {

  try {
    
    // const stakePubKey = new PublicKey(data.stakePubKey);
    const stakeAccountInfo = await connection.getAccountInfo(stakeAccount.publicKey);
    const voteAccounts = await connection.getVoteAccounts();
    
    if(!wallet?.publicKey) throw new Error("Wallet is not connected for stake");
    
    console.log("Stake account info", stakeAccountInfo?.lamports);
    console.log("Vote accounts list", voteAccounts.current);
  // last stake pubkey: 771snFdeSbQu5kXtqJu9cGdTXeQDtriLPS3YBub295Nv
    let transaction = new Transaction().add(
        StakeProgram.delegate({
          authorizedPubkey: wallet?.publicKey,
          stakePubkey: stakeAccount.publicKey,
          votePubkey: new PublicKey(voteAccounts.current[0].votePubkey),
        })
      );
    
      transaction.recentBlockhash = (
        await connection.getRecentBlockhash("max")
      ).blockhash;
      
      transaction.feePayer = wallet.publicKey;
      // transaction.addSignature(wallet?.publicKey, Buffer.from(stakeAccount.publicKey.toString()));
      // transaction.partialSign(stakeAccount);
      // transaction.sign(stakeAccount);
      transaction = await wallet.signTransaction(transaction);
      const isVerified = transaction.verifySignatures();
      if(!isVerified) throw new Error("Transaction is not verified");
      
      const txid = await connection.sendRawTransaction(transaction.serialize(), {preflightCommitment: "singleGossip"});
      
      // solana-gossip spy --entrypoint entrypoint.testnet.solana.com:8001
      console.log(txid);
      
      notify({
        message: "Stake Delegated",
        description: "Delegating staked SOL to the validator vote address",
        txid
      });
    } catch(err) {
      message.error(err.message || err.toString());
      console.log(err.message || err.toString());
    }
  }
    
export async function getDelegeationStatus (connection: Connection, wallet: WalletAdapter) {

  try {

    // recent stake pubkey: "771snFdeSbQu5kXtqJu9cGdTXeQDtriLPS3YBub295Nv"
    // const stakePubkey = new PublicKey(data.stakePubKey);
    let status = await connection.getStakeActivation(stakeAccount.publicKey);
    
    console.log("Activation status: ", status.state);

    // data.status = status.state;
    // setSaveData([...saveData]);
    
    notify({
      message: "Status: "+status.state,
      description: status.state == "activating"? "Still Activating the stake account" : 
      status.state == "active"? "Stake activated" :
      status.state == "inactive"? "Stake inactive" : 
      status.state == "deactivating"? "Stake deactivating" : "Something went wrong",
    });

    return status.state;
  } catch(err) {
    message.error(err.message || err.toString());
    console.log(err.message || err.toString());
  }
}