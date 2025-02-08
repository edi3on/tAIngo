import { expect } from "chai";
import { ethers } from "hardhat";
import { NumberStorage } from "../smart-contracts/typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("NumberStorage", function () {
  let numberStorage: NumberStorage;
  let owner: SignerWithAddress;
  let other: SignerWithAddress;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    const NumberStorage = await ethers.getContractFactory("NumberStorage");
    numberStorage = await NumberStorage.deploy();
    await numberStorage.deployed();
  });

  it("Should store and retrieve a number", async function () {
    await numberStorage.storeNumber(42);
    expect(await numberStorage.retrieveNumber()).to.equal(42);
  });

  it("Should increment the number", async function () {
    await numberStorage.storeNumber(42);
    await numberStorage.incrementNumber();
    expect(await numberStorage.retrieveNumber()).to.equal(43);
  });

  it("Should only allow owner to store number", async function () {
    await expect(
      numberStorage.connect(other).storeNumber(42)
    ).to.be.revertedWith("Not owner");
  });
}); 