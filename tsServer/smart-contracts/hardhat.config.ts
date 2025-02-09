import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Configure dotenv to look for .env file in parent directory
dotenv.config({ path: resolve(__dirname, "../../.env") });

// Add these debug logs temporarily
console.log("Environment check:");
console.log("RPC URL length:", process.env.ARBITRUM_SEPOLIA_RPC?.length || 0);
console.log("Private key exists:", !!process.env.PRIVATE_KEY);
console.log("Private key length:", process.env.PRIVATE_KEY?.length || 0);

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC || "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 421614
    },
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || ''
    }
  },
};

export default config; 