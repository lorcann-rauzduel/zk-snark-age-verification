// simple_multiplier.circom
pragma circom 2.1.4;
include "../node_modules/circomlib/circuits/comparators.circom";

template AgeGreaterThan18() {
    signal input age; 
    signal output out;

    component greaterThan = GreaterThan(8); 
    greaterThan.in[0] <== age;
    greaterThan.in[1] <== 17;

    out <-- greaterThan.out;
    out === 1;
}

component main = AgeGreaterThan18();