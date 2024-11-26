import path from "path";
import * as snarkjs from "snarkjs";

export const generateProof = async (inputs: {
  [key: string]: number;
}): Promise<any> => {
  const wasmPath = path.join(process.cwd(), "circuits/age_js/age.wasm");
  const provingKeyPath = path.join(process.cwd(), "circuits/final.zkey");
  try {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      inputs,
      wasmPath,
      provingKeyPath
    );
    return {
      proof,
      publicSignals,
    };
  } catch (error) {
    throw error;
  }
};
