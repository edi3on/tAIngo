# fast api babyyy

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List
from datetime import datetime
import json
import os
import requests
import time
import uvicorn
from operator import itemgetter
import subprocess
from urllib.parse import unquote, quote
ALCHEMY_API_KEY = ''

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/v3/getnfts/{address}")
def get_nfts(address: str):
    url = f"https://eth-mainnet.g.alchemy.com/nft/v3/{ALCHEMY_API_KEY}/getNFTsForOwner?owner={address}&withMetadata=true&pageSize=100"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching NFTs: {str(e)}")

    nfts_with_prices = []
    for nft in response.json().get('ownedNfts', []):
        floor_price = nft.get("contract", {}).get("openSeaMetadata", {}).get("floorPrice", 0)
        
        if floor_price is not None:
            nfts_with_prices.append({
                "name": nft.get("name", ""),
                "tokenId": nft.get("tokenId", ""),
                "image": nft.get("image", {}),
                "floor_price": floor_price
            })

    # Sort NFTs by floor price in descending order and get top 5
    top_5_nfts = sorted(nfts_with_prices, key=itemgetter('floor_price'), reverse=True)[:8]
    
    return {"data": top_5_nfts}

@app.get("/record/{data}")
def record_taming(data: str):
    try:
        # URL decode the data first
        decoded_data = unquote(data)
        print(f"Received data: {decoded_data}")  # Debug log
        
        # Split the data
        parts = decoded_data.split(',')
        if len(parts) != 3:
            raise ValueError(f"Expected 3 parts (user,nft,scale), got {len(parts)}: {parts}")
            
        user, nft, scale = parts
        
        # Validate scale is a number between 0 and 100
        scale_num = int(scale)
        if scale_num < 0 or scale_num > 100:
            raise HTTPException(status_code=400, detail="Scale must be between 0 and 100")
        
        # Get the absolute path to the smart-contracts directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        smart_contracts_dir = os.path.abspath(os.path.join(current_dir, "..", "tsServer", "smart-contracts"))
        
        print(f"Working directory: {smart_contracts_dir}")  # Debug log
        
        # Set up the environment variables
        env = os.environ.copy()
        env["TAMING_USER"] = user
        env["TAMING_NFT"] = nft
        env["TAMING_SCALE"] = str(scale)
        
        # Log the environment variables
        print(f"Environment variables set:")
        print(f"TAMING_USER: {env['TAMING_USER']}")
        print(f"TAMING_NFT: {env['TAMING_NFT']}")
        print(f"TAMING_SCALE: {env['TAMING_SCALE']}")
        
        # Construct and execute the command
        cmd = "yarn record arbitrumSepolia"
        
        # Execute the command
        result = subprocess.run(
            cmd,
            shell=True,
            cwd=smart_contracts_dir,
            env=env,
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            print("Error output:", result.stderr)  # Log the error
            raise HTTPException(status_code=500, detail=f"Command failed: {result.stderr}")
            
        return {
            "status": "success",
            "user": user,
            "nft": nft,
            "scale": scale,
            "output": result.stdout
        }
        
    except ValueError as ve:
        print(f"ValueError: {str(ve)}")  # Log the error
        raise HTTPException(status_code=400, detail=f"Invalid data format. Expected: user,nft,scale. Error: {str(ve)}")
    except Exception as e:
        print(f"Exception: {str(e)}")  # Log the exception
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
