import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { generateProof } from "../utils/generate-proof";

describe("IntervalProof", function () {
  async function deployIntervalProofFixture() {
    const Verifier = await ethers.getContractFactory("Groth16Verifier");
    const verifier = await Verifier.deploy();

    const YourContract = await ethers.getContractFactory("AgeGateway");
    const contract = await YourContract.deploy(await verifier.getAddress());

    return { contract, verifier };
  }

  describe("Proof verification", function () {
    it("should be valid if age is over 18", async function () {
      const { verifier } = await loadFixture(deployIntervalProofFixture);

      const { proof, publicSignals } = await generateProof({
        age: 22,
      });

      const isValid = await verifier.verifyProof(
        [proof.pi_a[0], proof.pi_a[1]],
        [
          [proof.pi_b[0][1], proof.pi_b[0][0]],
          [proof.pi_b[1][1], proof.pi_b[1][0]],
        ],
        [proof.pi_c[0], proof.pi_c[1]],
        publicSignals
      );

      expect(isValid).to.be.true;
    });

    it("should fail if age is under 18", async function () {
      try {
        await generateProof({
          age: 16,
        });
      } catch (error: any) {
        return;
      }

      expect.fail("proof should fail");
    });
  });
});
