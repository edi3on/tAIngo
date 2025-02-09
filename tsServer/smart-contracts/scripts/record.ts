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
    userId: 3,
    targetPetId: 1,
    successRate: 70,
    usedNftIds: [10],
    isSuccessful: false
  };

  console.log("\nRecording new taming attempt with data:", tamingData);

  try {
    const [signer] = await ethers.getSigners();
    console.log("Using signer address:", await signer.getAddress());

    const PetTaming = await ethers.getContractFactory("PetTaming");
    const contract = PetTaming.attach(contractAddress);

    const tx = await contract.recordTamingAttempt(
      tamingData.userId,
      tamingData.targetPetId,
      tamingData.successRate,
      tamingData.usedNftIds,
      tamingData.isSuccessful
    );

    console.log("Transaction hash:", tx.hash);
    console.log("Waiting for confirmation...");
    await tx.wait();
    console.log("Transaction confirmed!");

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