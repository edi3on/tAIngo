import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC || "",
      accounts: [process.env.PRIVATE_KEY || ""]
    },
    flowEvm: {
      url: process.env.FLOW_EVM_RPC || "https://testnet.evm.nodes.onflow.org",
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 545,
      gasPrice: 1000000000
    }
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || "",
      flowEvm: "any" // Flow EVM doesn't require an API key for verification
    },
    customChains: [
      {
        network: "flowEvm",
        chainId: 545,
        urls: {
          apiURL: "https://testnet.evm.nodes.onflow.org/api",
          browserURL: "https://evm-testnet.flowscan.io"
        }
      }
    ]
  }
};

export default config;