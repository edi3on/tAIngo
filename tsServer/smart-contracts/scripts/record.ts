import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Clear require cache to ensure fresh env vars
Object.keys(require.cache).forEach(function(key) { 
    delete require.cache[key];
});

async function main() {
  console.log("\n=== Environment Setup ===");
  const envPath = resolve(__dirname, "../../../.env");
  const result = dotenv.config({ path: envPath, override: true });
  console.log("Loading .env from:", envPath);
  
  // Get arguments from environment variables
  const user = process.env.TAMING_USER;
  const nft = process.env.TAMING_NFT;
  const tameScale = parseInt(process.env.TAMING_SCALE || "");

  if (!user || !nft || isNaN(tameScale)) {
    console.error("\nError: Missing environment variables");
    console.log("\nRequired environment variables:");
    console.log("TAMING_USER - The user identifier");
    console.log("TAMING_NFT - The NFT identifier");
    console.log("TAMING_SCALE - A number between 0 and 100");
    console.log("\nExample:");
    console.log('TAMING_USER="player123" TAMING_NFT="dragon#123" TAMING_SCALE=75 yarn record arbitrumSepolia');
    process.exit(1);
  }

  // Validate tameScale
  if (tameScale < 0 || tameScale > 100) {
    console.error("\nError: TAMING_SCALE must be a number between 0 and 100");
    process.exit(1);
  }

  console.log("\nLoaded CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS);
  
  if (!process.env.CONTRACT_ADDRESS?.startsWith('0x')) {
    throw new Error(`Invalid contract address: ${process.env.CONTRACT_ADDRESS}. Must start with 0x and be 42 characters long.`);
  }

  const contractAddress = process.env.CONTRACT_ADDRESS;
  console.log("\nAttempting to interact with contract at:", contractAddress);

  const tamingData = {
    user,
    nft,
    tameScale
  };

  console.log("\nRecording new taming attempt with data:", tamingData);

  try {
    const [signer] = await ethers.getSigners();
    console.log("Using signer address:", await signer.getAddress());

    const PetTaming = await ethers.getContractFactory("PetTaming");
    const contract = PetTaming.attach(contractAddress);

    // First, try to call a view function to verify the contract exists and is correct
    try {
      await contract.getAllAttempts();
    } catch (error) {
      console.error("\nFailed to verify contract. This might be the wrong contract address or an old version.");
      console.log("Please redeploy the contract using: yarn deploy arbitrumSepolia");
      throw error;
    }

    console.log("Contract verified, sending transaction...");

    const tx = await contract.recordTamingAttempt(
      tamingData.user,
      tamingData.nft,
      tamingData.tameScale,
      {
        gasLimit: 500000  // Set explicit gas limit
      }
    );

    console.log("Transaction hash:", tx.hash);
    console.log("Waiting for confirmation...");
    await tx.wait();
    console.log("Transaction confirmed!");

    // Get the latest attempt to verify
    const latest = await contract.getLatestAttempt();
    console.log("\nLatest recorded attempt:", {
      user: latest.user,
      nft: latest.nft,
      tameScale: latest.tameScale.toString() + "%"
    });

  } catch (error) {
    console.error("\nTransaction failed:", error);
    console.log("\nDebug info:");
    console.log("Contract address from env:", process.env.CONTRACT_ADDRESS);
    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});