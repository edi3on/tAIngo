# Pet Taming Smart Contract

This project contains a smart contract for recording pet taming attempts in a blockchain game. The contract stores taming data including the user, NFT identifier, and taming success rate.

## Contract Details

### PetTaming.sol
The smart contract stores taming attempts with the following structure:  

solidity  
struct TamingAttempt {  
string user; // Username or identifier  
string nft; // NFT identifier  
uint8 tameScale; // 0-100 representing 0.0-1.0 (multiply by 100 for percentage)  
}  


Key functions:
- `recordTamingAttempt(string user, string nft, uint8 tameScale)`: Records a new taming attempt
- `getAllAttempts()`: Returns all recorded attempts
- `getLatestAttempt()`: Returns the most recent attempt

## Scripts

### deploy.ts
Handles contract deployment to either Arbitrum Sepolia or Flow EVM networks. Features:
- Automatic contract verification on Arbitrum Sepolia
- Gas estimation and deployment confirmation
- Environment variable validation

### record.ts
Records new taming attempts to the deployed contract. Takes three parameters via environment variables:
- TAMING_USER: The user identifier
- TAMING_NFT: The NFT identifier
- TAMING_SCALE: A number between 0-100 representing the taming success rate

## Setup & Installation

1. Install dependencies:
yarn install

3. Create .env file:
cp .env.example .env

5. Fill in your .env file with:

PRIVATE_KEY=your_wallet_private_key  
CONTRACT_ADDRESS=deployed_contract_address  
ARBITRUM_SEPOLIA_RPC=https://sepolia-rollup.arbitrum.io/rpc  
ARBISCAN_API_KEY=your_arbiscan_api_key  
FLOW_EVM_RPC=https://testnet.evm.nodes.onflow.org  


5. Get required API keys:
- Arbiscan API key: [https://arbiscan.io/apis](https://docs.arbiscan.io/getting-started/viewing-api-usage-statistics)
- Get testnet FLOW tokens: [https://testnet-faucet.evm.nodes.onflow.org/](https://testnet-faucet.onflow.org/fund-account)

## Usage

### Deploy Contract

Deploy to Arbitrum Sepolia  
yarn deploy arbitrumSepolia  
Deploy to Flow EVM  
yarn deploy flowEvm  

### Record Taming Attempt

Record on Arbitrum Sepolia  
TAMING_USER="player123" TAMING_NFT="dragon#123" TAMING_SCALE=75 yarn record arbitrumSepolia  
Record on Flow EVM  
TAMING_USER="player123" TAMING_NFT="dragon#123" TAMING_SCALE=75 yarn record flowEvm  


### Scale Values
The tameScale parameter uses integers from 0-100 to represent percentages:
- 75 = 0.75 (75%)
- 100 = 1.0 (100%)
- 50 = 0.5 (50%)

## Network Support
- Arbitrum Sepolia: Full support with contract verification
- Flow EVM: Deployment and interaction support (verification not yet available)

## Environment Variables
- PRIVATE_KEY: Your wallet's private key
- CONTRACT_ADDRESS: The deployed contract address
- ARBITRUM_SEPOLIA_RPC: Arbitrum Sepolia RPC URL
- ARBISCAN_API_KEY: API key for contract verification
- FLOW_EVM_RPC: Flow EVM RPC URL

## Common Issues
1. "Invalid contract address": Ensure CONTRACT_ADDRESS in .env starts with '0x'
2. "Missing environment variables": Check all required env vars are set
3. "Scale must be between 0 and 100": Ensure TAMING_SCALE is a valid percentage
