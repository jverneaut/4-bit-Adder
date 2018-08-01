/*
  THE TRANSISTOR
*/

// The transistor acts like a switch. It only passes current from the collector
// to the emitter if there is current at the base.
// It could be compared to a simple if statement.

const emitter = (collector, base) => base === 1 ? collector : 0;

// emitter(0, 0) = 0;
// emitter(0, 1) = 0;
// emitter(1, 0) = 0;
// emitter(1, 1) = 1;


/*
  LOGIC GATES
*/

// Logic gates are built with transistors. They form the smallest unit of computing
// upon which we can build more complicated functionalities.
// The average CPU have billions of transistors and hundreds of millions of logic gates.

// The AND gate uses 2 transistors. It return 1 only if a AND b = 1.

const AND = (a, b, current = 1) => emitter(emitter(current, a), b);

// The OR gate uses 2 transistors. It return 1 if a OR b or both = 1.
// Math.min is used to mimic circuit behaviour and keep the + instead of using
// javascript own OR operator ||.

const OR = (a, b, current = 1) => Math.min(emitter(current, a) + emitter(current, b), 1);

// The XOR gate uses 4 transitors. It return 1 if a OR b = 1 but not both.
// The if condition is used to mimic actual circuit behaviour: the gates are wired in such a
// way that if current flows through the AND gate, it doesn't go to the OR gate.

const XOR = (a, b, current = 1) => AND(a, b, current) === 1 ? 0 : OR(a, b, current);

// You can build a lot more logic gates, but we only need these 3 to build a simple calculator.


/*
  ADDERS
*/

// To go from transistors to higher level computing units, we built logic gates.
// To add more complex functionalities to our circuit, we can use the logic gates
// we built to make even higher level computing units.

// The half adder performs bitwise operations.
// Given two bits a and b, it adds them together. If the sum exceeds the bit capacity,
// the CARRY output activate, allowing the next bit to know that it needs to account for it.
// It uses 6 transistors.

const halfAdder = (a, b) => ({
  SUM: XOR(a, b),
  CARRY: AND(a, b)
});

// The full adder acts exactly like the half adder, excepts that it takes the carry
// of the preceeding operator as a supplementary input.
// It uses 14 transistors.

const fullAdder = (a, b, carry) => {
  const halfAdder1 = halfAdder(a, b);
  const halfAdder2 = halfAdder(halfAdder1.SUM, carry);
  return {
    SUM: halfAdder2.SUM,
    CARRY: OR(halfAdder1.CARRY, halfAdder2.CARRY)
  };
};


/*
  MAKING A CALCULATOR
*/

// Now that we built half and full adders, we can chain them to make a very basic calculator.
// Our calculator takes as input two 4bits binary numbers represented here by two arrays and
// output a 5bits binary number represented in the same way.

const input1 = [0, 1, 0, 1]; // 5
const input2 = [1, 1, 1, 0]; // 14

let output = [];

// To add numbers, we first use a half adder on the last digit of our binary number.
// (remember that we read binary from right to left, hence the reverse array)

output[4] = halfAdder(input1[3], input2[3]);

// The output looks like this: { SUM: 1, CARRY: 0}

// We then chain full adders for every number in our input.

output[3] = fullAdder(input1[2], input2[2], output[4].CARRY);
output[2] = fullAdder(input1[1], input2[1], output[3].CARRY);
output[1] = fullAdder(input1[0], input2[0], output[2].CARRY);

// At the moment, our array contains the sum and carry of every adder.

// That's not very realistic, let's only keep the actual sum for each one.

output[0] = output[1].CARRY;
output[1] = output[1].SUM;
output[2] = output[2].SUM;
output[3] = output[3].SUM;
output[4] = output[4].SUM;

// Our output now contains our final number.

console.log({ input1 }); // [0, 1, 0, 1]       5
console.log({ input2 }); // [1, 1, 1, 0]    + 14
console.log({ output }); // [1, 0, 0, 1, 1] = 19


// To make this simple 4bits adder, we used 3 full adders and 1 half adder.
// 3 x 14 + 1 x 6 = 48
// Just to add two numbers, our final circuit uses 48 transistors!
// I hope that you now understand why these components are so important and why the
// Silicon Valley, where these components were first mass-produced, has become
// the tech empire it is today.

// Julien Verneaut
// https://www.julienverneaut.com
