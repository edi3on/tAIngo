from web3 import Web3
from eth_account import Account
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to Arbitrum Sepolia
ARBITRUM_SEPOLIA_RPC = "https://sepolia-rollup.arbitrum.io/rpc"
w3 = Web3(Web3.HTTPProvider(ARBITRUM_SEPOLIA_RPC))

# Your contract ABI (from compilation)
CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "retrieveNumber",
        "outputs": [{"type": "uint256", "name": ""}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"type": "uint256", "name": "_number"}],
        "name": "storeNumber",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "incrementNumber",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

# Add contract bytecode from compilation
CONTRACT_BYTECODE = "0x..." # You'll need to add your contract's bytecode here

# Get private key from environment variable
PRIVATE_KEY = os.getenv('PRIVATE_KEY')
if not PRIVATE_KEY:
    raise Exception("Please set PRIVATE_KEY environment variable")

# Create contract instance
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

# Create account from private key
account = Account.from_key(PRIVATE_KEY)

def store_number(number):
    try:
        nonce = w3.eth.get_transaction_count(account.address)
        
        # Build transaction
        transaction = contract.functions.storeNumber(number).build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': 200000,
            'gasPrice': w3.eth.gas_price,
            'chainId': 421614  # Arbitrum Sepolia chain ID
        })
        
        # Sign and send transaction
        signed_txn = w3.eth.account.sign_transaction(transaction, PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        
        print(f"Transaction sent: {tx_hash.hex()}")
        
        # Wait for transaction receipt
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        return receipt
    except Exception as e:
        print(f"Error in store_number: {str(e)}")
        raise

def get_number():
    return contract.functions.retrieveNumber().call()

def increment_number():
    nonce = w3.eth.get_transaction_count(account.address)
    
    transaction = contract.functions.incrementNumber().build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': w3.eth.gas_price
    })
    
    signed_txn = w3.eth.account.sign_transaction(transaction, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    return receipt

def verify_contract():
    # Check if there's any code at the address
    code = w3.eth.get_code(CONTRACT_ADDRESS)
    if code == b'':
        raise Exception(f"No contract found at address {CONTRACT_ADDRESS}")
    
    # Try to call a view function to verify the contract interface
    try:
        # This calls retrieveNumber() which is a view function (no gas needed)
        current_number = contract.functions.retrieveNumber().call()
        print(f"Contract verified! Current number: {current_number}")
        return True
    except Exception as e:
        print(f"Contract verification failed: {str(e)}")
        print("This could mean:")
        print("1. The contract address is incorrect")
        print("2. The ABI doesn't match the deployed contract")
        print("3. The contract is deployed on a different network")
        raise

def deploy_contract():
    try:
        # Create contract deployment transaction
        contract = w3.eth.contract(abi=CONTRACT_ABI, bytecode=CONTRACT_BYTECODE)
        
        # Get nonce
        nonce = w3.eth.get_transaction_count(account.address)
        
        # Build deployment transaction
        transaction = contract.constructor().build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': 3000000,  # Adjust gas limit as needed
            'gasPrice': w3.eth.gas_price,
            'chainId': 421614
        })
        
        # Sign and send transaction
        signed_txn = w3.eth.account.sign_transaction(transaction, PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        
        print(f"Deployment transaction sent: {tx_hash.hex()}")
        
        # Wait for transaction receipt
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        contract_address = receipt['contractAddress']
        
        print(f"Contract deployed to: {contract_address}")
        return contract_address
        
    except Exception as e:
        print(f"Error in deploy_contract: {str(e)}")
        raise

def main():
    # Check connection
    if not w3.is_connected():
        raise Exception("Failed to connect to Arbitrum Sepolia")

    print(f"Connected to network: {w3.eth.chain_id}")
    print(f"Account address: {account.address}")
    
    # Deploy the contract
    print("Deploying contract...")
    contract_address = deploy_contract()
    
    # Update the contract instance with new address
    contract = w3.eth.contract(address=contract_address, abi=CONTRACT_ABI)
    
    # Verify contract deployment
    verify_contract()
    
    try:
        # Store a number
        print("Storing number 42...")
        store_number(42)
        
        # Get the stored number
        number = get_number()
        print(f"Stored number: {number}")
        
        # Increment the number
        print("Incrementing number...")
        increment_number()
        
        # Get the updated number
        new_number = get_number()
        print(f"New number: {new_number}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()