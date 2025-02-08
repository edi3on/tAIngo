import { ethers } from "hardhat";
import { JsonRpcProvider } from "ethers";
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

  // Get transaction receipt
  const provider = new JsonRpcProvider(process.env.ARBITRUM_SEPOLIA_RPC);
  const receipt = await provider.getTransactionReceipt(petTaming.deploymentTransaction()?.hash || "");
  
  console.log("Transaction hash:", receipt?.hash);

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