import { ethers } from "hardhat";
import { run } from "hardhat";

async function main() {
  // Get the deployer's signer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying PetTaming contract with account:", deployer.address);

  // Deploy the contract
  const PetTaming = await ethers.getContractFactory("PetTaming");
  const petTaming = await PetTaming.deploy();
  
  console.log("Waiting for deployment...");
  await petTaming.waitForDeployment();

  const address = await petTaming.getAddress();
  console.log("PetTaming contract deployed to:", address);

  // Get transaction hash directly from the deployment transaction
  const txHash = petTaming.deploymentTransaction()?.hash;
  console.log("Transaction hash:", txHash);

  // Wait a few seconds before verification to ensure the contract is deployed
  console.log("Waiting for contract to be propagated...");
  await new Promise(resolve => setTimeout(resolve, 20000)); // 20 seconds delay

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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 