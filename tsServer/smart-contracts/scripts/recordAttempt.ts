import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Configure dotenv to look for .env file in parent directory
dotenv.config({ path: resolve(__dirname, "../../../.env") });

async function main() {
    console.log("Starting record attempt process...");

    // Get contract address from environment variable
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
    if (!CONTRACT_ADDRESS) {
        throw new Error("CONTRACT_ADDRESS not found in .env file");
    }

    console.log("Contract Address:", CONTRACT_ADDRESS);

    // Get the contract instance
    const PetTaming = await ethers.getContractFactory("PetTaming");
    const petTaming = PetTaming.attach(CONTRACT_ADDRESS);

    // Using current timestamp to make each attempt unique
    const timestamp = Date.now();
    const userId = 10;              // Different user ID
    const targetPetId = 1
    const successRate = 80;
    const usedNftIds = [10, 15, 30];
    const isSuccessful = true;

    console.log(`\nRecording new taming attempt with data:`, {
        userId,
        targetPetId,
        successRate,
        usedNftIds,
        isSuccessful
    });
    
    // Record the taming attempt
    const tx = await petTaming.recordTamingAttempt(
        userId,
        targetPetId,
        successRate,
        usedNftIds,
        isSuccessful
    );

    console.log("\nTransaction sent!");
    console.log("Transaction hash:", tx.hash);
    console.log("Waiting for confirmation...");
    
    const receipt = await tx.wait();
    console.log("\nTransaction confirmed in block:", receipt.blockNumber);

    // Get ALL attempts for this user
    console.log("\nFetching ALL attempts for user", userId);
    const allAttempts = await petTaming.getUserAttempts(userId);
    
    console.log(`\nFound ${allAttempts.length} attempts for user ${userId}:`);
    allAttempts.forEach((attempt, index) => {
        console.log(`\nAttempt #${index + 1}:`);
        console.log("Target Pet ID:", attempt.targetPetId.toString());
        console.log("Success Rate:", attempt.successRate.toString());
        console.log("Used NFT IDs:", attempt.usedNftIds.map(id => id.toString()));
        console.log("Was Successful:", attempt.isSuccessful);
        console.log("Timestamp:", new Date(Number(attempt.timestamp) * 1000).toLocaleString());
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });