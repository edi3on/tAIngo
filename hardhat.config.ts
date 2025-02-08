import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "./.env") });

// Add these console.logs for debugging
console.log("Current directory:", __dirname);
console.log("PRIVATE_KEY length:", process.env.PRIVATE_KEY?.length);
console.log("ARBITRUM_SEPOLIA_RPC:", process.env.ARBITRUM_SEPOLIA_RPC);

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC || "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || ''
    }
  },
};

export default config;
