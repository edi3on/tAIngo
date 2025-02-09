# tAIngo: Digital NFT pet taming

A blockchain-based backend system for an NFT taming game. This project consists of two main components for backend:

## 1. Smart Contract Server (tsServer)
Located in `/tsServer`

A TypeScript/Solidity implementation that:
- Manages the smart contract for recording taming attempts
- Handles contract deployment and interaction
- Supports both Arbitrum Sepolia and Flow EVM networks

[See tsServer README](tsServer/README.md) for:
- Contract details
- Deployment instructions
- Environment setup
- Usage examples

## 2. Python API Server (pyServer)
Located in `/pyServer`

A FastAPI server that:
- Retrieves NFT data using Alchemy API
- Records taming attempts to the blockchain
- Provides REST endpoints for game client interaction

[See pyServer README](pyServer/README.md) for:
- API endpoints
- Installation steps
- Usage examples
- Testing instructions

## UE5 (front end)
- UE5 talks to both py and eliza servers
- uses UE5 specific functions to improve AI (behavior tree)
![bt_ss3](https://github.com/user-attachments/assets/9443318b-ce3b-4e54-ba96-0ed8064c7063)

## Quick Start

1. Set up the smart contract:
cd tsServer/smart-contracts
yarn install
cp .env.example .env

2. Fill in your .env values
yarn deploy arbitrumSepolia  

3. Start the Python server:
cd pyServer
pip install -r requirements.txt
python server.py

4. Run Eliza server (details in elizaServer folder)
  
5.  Install UE5.3 and run "taingo.uproject"


## Prerequisites
- Node.js & Yarn
- Python 3.7+
- Ethereum wallet with testnet tokens
- Alchemy API key
- UE5.3

See individual component READMEs for detailed setup instructions.
Link to project page: [Link](https://ethglobal.com/showcase/taingo-e0c04)
