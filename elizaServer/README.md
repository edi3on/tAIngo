# Python FastAPI Server for tAIngo

A FastAPI server that provides two main endpoints:
1. NFT data retrieval using Alchemy API
2. Recording taming attempts to the blockchain

## Features

### NFT Data Retrieval
`/v3/getnfts/{address}`
- Returns top 8 NFTs sorted by floor price
- Includes NFT name, token ID, image URL, and floor price
- Uses Alchemy API for data retrieval

### Taming Record Endpoint
`/record/{data}`
- Records taming attempts to the blockchain
- Format: `user,nft,scale` (URL-encoded)
- Example: `player123,dragon%23123,75`
- Scale must be between 0-100

## Installation

1. Install Python dependencies:  
pip install fastapi uvicorn[standard] requests

2. Create .env file
See tsServer/README.md

## Usage

### Start the Server  
python server.py  
Server will run on `http://localhost:8000`

### Test Endpoints

1. Check server status:  
curl http://localhost:8000/


2. Get NFTs for an address:  
curl http://localhost:8000/v3/getnfts/0x123...


3. Record a taming attempt:
curl http://localhost:8000/record/player123%2Cdragon%23123%2C75
## API Response Examples

### GET /v3/getnfts/{address}  
json
{
"data": [
{
"name": "NFT Name",
"tokenId": "123",
"image": "image_url",
"floor_price": 1.5
}
]
}  

### GET /record/{data}  
json
{
"status": "success",
"user": "player123",
"nft": "dragon#123",
"scale": "75",
"output": "transaction_output"
}  


## Common Issues

1. "Invalid data format": Ensure data is properly URL-encoded (especially the # in NFT names)
2. "Scale must be between 0 and 100": Check taming scale value
3. "Command failed": Verify blockchain connection and contract address in tsServer/.env

## Dependencies
- FastAPI
- Uvicorn
- Requests
- Python 3.7+

## Note
This server interacts with the smart contract deployment in the tsServer directory. Make sure the smart contract is properly deployed and the contract address is set in tsServer/smart-contracts/.env before using the record endpoint.
