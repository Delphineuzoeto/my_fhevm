import { FHECounter, FHECounter__factory } from "../types";
import { FhevmType } from "@fhevm/hardhat-plugin";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, fhevm } from "hardhat";

type Signers = {
  deployer: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("FHECounter")) as FHECounter__factory;
  const fheCounterContract = (await factory.deploy()) as FHECounter;
  const fheCounterContractAddress = await fheCounterContract.getAddress();

  return { fheCounterContract, fheCounterContractAddress };
}

describe("FHECounter", function () {
  let signers: Signers;
  let fheCounterContract: FHECounter;
  let fheCounterContractAddress: string;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
  });

  beforeEach(async () => {
    ({ fheCounterContract, fheCounterContractAddress } = await deployFixture());
  });

  it("should be deployed", async function () {
    console.log(`FHECounter has been deployed at address ${fheCounterContractAddress}`);
    // Test the deployed address is valid
    expect(ethers.isAddress(fheCounterContractAddress)).to.eq(true);
  });

  //   it("count should be zero after deployment", async function () {
  //     const count = await counterContract.getCount();
  //     console.log(`Counter.getCount() === ${count}`);
  //     // Expect initial count to be 0 after deployment
  //     expect(count).to.eq(0);
  //   });

  //   it("increment the counter by 1", async function () {
  //     const countBeforeInc = await counterContract.getCount();
  //     const tx = await counterContract.connect(signers.alice).increment(1);
  //     await tx.wait();
  //     const countAfterInc = await counterContract.getCount();
  //     expect(countAfterInc).to.eq(countBeforeInc + 1n);
  //   });

  //   it("decrement the counter by 1", async function () {
  //     // First increment, count becomes 1
  //     let tx = await counterContract.connect(signers.alice).increment();
  //     await tx.wait();
  //     // Then decrement, count goes back to 0
  //     tx = await counterContract.connect(signers.alice).decrement(1);
  //     await tx.wait();
  //     const count = await counterContract.getCount();
  //     expect(count).to.eq(0);
  //   });
});
