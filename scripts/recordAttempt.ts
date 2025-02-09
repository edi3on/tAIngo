import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    // Get contract address from environment variable
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
    if (!CONTRACT_ADDRESS) {
        throw new Error("CONTRACT_ADDRESS not found in .env file");
    }

    // Get the contract instance
    const PetTaming = await ethers.getContractFactory("PetTaming");
    const petTaming = PetTaming.attach(CONTRACT_ADDRESS);

    // Example taming attempt data
    const userId = 100;              // User's ID
    const targetPetId = 20;       // ID of the pet they're trying to tame
    const successRate = 30;        // Success rate (0-100)
    const usedNftIds = [200, 120]; // IDs of NFTs used in taming attempt
    const isSuccessful = false;     // Whether the taming was successful

    console.log(`Recording taming attempt for user ${userId}...`);
    console.log("Contract address:", CONTRACT_ADDRESS);

    // Record the taming attempt
    const tx = await petTaming.recordTamingAttempt(
        userId,
        targetPetId,
        successRate,
        usedNftIds,
        isSuccessful
    );

    console.log("Waiting for transaction...");
    await tx.wait();

    console.log("Taming attempt recorded!");
    console.log("Transaction hash:", tx.hash);

    // Get the latest attempt to verify
    const latestAttempt = await petTaming.getLatestAttempt(userId);
    console.log("\nLatest attempt details:");
    console.log("User ID:", latestAttempt.userId.toString());
    console.log("Target Pet ID:", latestAttempt.targetPetId.toString());
    console.log("Success Rate:", latestAttempt.successRate.toString());
    console.log("Used NFT IDs:", latestAttempt.usedNftIds.map(id => id.toString()));
    console.log("Was Successful:", latestAttempt.isSuccessful);
    console.log("Timestamp:", new Date(Number(latestAttempt.timestamp) * 1000).toLocaleString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 