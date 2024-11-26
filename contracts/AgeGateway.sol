// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;
import "./AgeVerifier.sol";

contract AgeGateway {
    Groth16Verifier public verifier;
    mapping(address => bool) public ageChecked;
    
    constructor(address _verifier) {
        verifier = Groth16Verifier(_verifier);
    }
    
    function verify(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) external {
          require(
            verifier.verifyProof(a, b, c, input),
            "Below 18 years old"
        );

        ageChecked[msg.sender] = true;
    }
}

