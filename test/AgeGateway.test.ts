import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { generateProof } from "../utils/generate-proof";

describe("IntervalProof", function () {
  async function deployIntervalProofFixture() {
    const signers = await ethers.getSigners();
    const Verifier = await ethers.getContractFactory("Groth16Verifier");
    const verifier = await Verifier.deploy();

    const AgeGateway = await ethers.getContractFactory("AgeGateway");
    const ageGateway = await AgeGateway.deploy(await verifier.getAddress());

    return { ageGateway, verifier, signers };
  }

  describe("Proof verification", function () {
    it("should be valid if age is over 18", async function () {
      const { verifier, ageGateway, signers } = await loadFixture(
        deployIntervalProofFixture
      );

      const { proof, publicSignals } = await generateProof({
        age: 22,
      });

      const a: [number, number] = [proof.pi_a[0], proof.pi_a[1]];
      const b: [[number, number], [number, number]] = [
        [proof.pi_b[0][1], proof.pi_b[0][0]],
        [proof.pi_b[1][1], proof.pi_b[1][0]],
      ];
      const c: [number, number] = [proof.pi_c[0], proof.pi_c[1]];
      const isValid = await verifier.verifyProof(a, b, c, publicSignals);
      expect(isValid).to.be.true;

      await ageGateway.verify(a, b, c, publicSignals);
      const ageChecked = await ageGateway.ageChecked(signers[0].address);
      expect(ageChecked).to.be.true;
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
