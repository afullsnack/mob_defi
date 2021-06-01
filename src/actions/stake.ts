import {
  PublicKey,
  Account,
  Connection,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import anchor from "@project-serum/anchor";

import path from "path";
import fs from "fs";

import { useWallet } from "../contexts/wallet";
import { useConnection } from "../contexts/connection"
import { useAccount } from "../contexts/accounts"

const PROGRAM_PATH = path.resolve(__dirname, '../../program/target/deploy/');
const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, 'bpf_program_template.so');
const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, 'bpf_program_template-keypair.json');

// let programId: PublicKey;
let connection: Connection;


export async function sampleRPC() {
  const idl = JSON.parse(fs.readFileSync('./target/idl/basic_0.json', 'utf8'));

  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey('<YOUR-PROGRAM-ID>');

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);

  // Execute the RPC.
  await program.rpc.initialize();
}