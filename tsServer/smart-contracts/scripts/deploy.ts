import { ethers } from "hardhat";
import { run } from "hardhat";

async function main() {
  console.log("Starting deployment process...");
  
  try {
    // Get the deployer's signer
    const [deployer] = await ethers.getSigners();
    console.log("Got signer. Deploying with account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    // Deploy the contract
    console.log("Getting contract factory...");
    const PetTaming = await ethers.getContractFactory("PetTaming");
    console.log("Deploying contract...");
    const petTaming = await PetTaming.deploy();
    
    console.log("Waiting for deployment...");
    await petTaming.waitForDeployment();

    const address = await petTaming.getAddress();
    console.log("PetTaming contract deployed to:", address);
    console.log("Transaction hash:", petTaming.deploymentTransaction()?.hash);

    // Save this address to your .env file for the recordAttempt script
    console.log("\nPlease add this contract address to your .env file as CONTRACT_ADDRESS=", address);

    // Wait before verification
    console.log("\nWaiting for contract to be propagated before verification...");
    await new Promise(resolve => setTimeout(resolve, 20000));

    // Verify the contract
    console.log("Verifying contract...");
    try {
      await run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified!");
    } catch (error) {
      console.log("Verification failed:", error);
    }
  } catch (error) {
    console.error("Deployment failed with error:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });