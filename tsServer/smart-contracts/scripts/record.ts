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
  
  // Debug log the loaded environment variables
  console.log("\nLoaded CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS);
  
  // Validate contract address
  if (!process.env.CONTRACT_ADDRESS?.startsWith('0x')) {
    throw new Error(`Invalid contract address: ${process.env.CONTRACT_ADDRESS}. Must start with 0x and be 42 characters long.`);
  }

  const contractAddress = process.env.CONTRACT_ADDRESS;
  console.log("\nAttempting to interact with contract at:", contractAddress);

  const tamingData = {
    user: "player123",
    nft: "dragon#123",
    tameScale: 75  // represents 0.75 or 75%
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
    console.log("\nPlease try these steps:");
    console.log("1. Redeploy the contract: yarn deploy arbitrumSepolia");
    console.log("2. Update your .env with the new contract address");
    console.log("3. Try recording again");
    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});