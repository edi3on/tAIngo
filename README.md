# tAIngo: Digital NFT pet taming

A blockchain-based backend system for an NFT taming game. This project consists of two main components:

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

## Quick Start

1. Set up the smart contract:
cd tsServer/smart-contracts
yarn install
cp .env.example .env

##Fill in your .env values
yarn deploy arbitrumSepolia  

2. Start the Python server:
cd pyServer
pip install -r requirements.txt
python server.py


## Prerequisites
- Node.js & Yarn
- Python 3.7+
- Ethereum wallet with testnet tokens
- Alchemy API key

See individual component READMEs for detailed setup instructions.
