import { PublicKey } from "@solana/web3.js";

export const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
export let TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export let LENDING_PROGRAM_ID = new PublicKey(
  "TokenLending1111111111111111111111111111111"
);

export let SWAP_PROGRAM_ID = new PublicKey(
  "SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8"
);

// smart contract program ID
export let SMART_CONTRACT_ID = new PublicKey(
  "A8oa5AyiHiL7nGf3DQrztoSvDPXe3xMBF2FtSeGwWn4x"
);

// staking program id
export let STAKE_PROGRAM_ID = new PublicKey(
  "Stake11111111111111111111111111111111111111"
);

export const PROGRAM_IDS = [
  {
    name: "mainnet-beta",
  },
  {
    name: "testnet",
  },
  {
    name: "devnet",
  },
  {
    name: "localnet",
  },
];

export const setProgramIds = (envName: string) => {
  let instance = PROGRAM_IDS.find((env) => env.name === envName);
  if (!instance) {
    return;
  }
};

export const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
  };
};
