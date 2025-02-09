import { ethers } from "hardhat";
import { run } from "hardhat";
import { resolve } from "path";
import * as dotenv from "dotenv";

async function main() {
  console.log("Starting deployment process...");
  
  // Get the signer
  const [deployer] = await ethers.getSigners();
  console.log("Got signer. Deploying with account:", deployer.address);
  
  // Log the account balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  console.log("Getting contract factory...");
  const PetTaming = await ethers.getContractFactory("PetTaming");
  
  console.log("Deploying contract...");
  const contract = await PetTaming.deploy();
  
  console.log("Waiting for deployment...");
  await contract.waitForDeployment();
  
  const contractAddress = await contract.getAddress();
  console.log("PetTaming contract deployed to:", contractAddress);
  console.log("Transaction hash:", contract.deploymentTransaction()?.hash);
  
  console.log("\nPlease update your .env file with:");
  console.log(`CONTRACT_ADDRESS=${contractAddress}`);

  // Only attempt verification on networks that support it
  const networkName = process.env.HARDHAT_NETWORK;
  if (networkName === 'arbitrumSepolia') {
    console.log("\nWaiting before verification...");
    await new Promise(resolve => setTimeout(resolve, 15000));

    console.log("Verifying contract...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Verification failed:", error);
    }
  } else {
    console.log("\nSkipping verification on", networkName, "as it's not fully supported yet");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});