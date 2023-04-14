// Function to generate a string of random bits
function generateRandomBits(length) {
  let bits = "";
  for (let i = 0; i < length; i++) {
    bits += Math.floor(Math.random() * 2).toString();
  }
  return bits;
}

// Function to apply a Hadamard gate to a qubit
function applyHadamard(qubit) {
  const h = math.matrix([
    [1 / math.sqrt(2), 1 / math.sqrt(2)],
    [1 / math.sqrt(2), -1 / math.sqrt(2)],
  ]);
  return math.multiply(h, qubit);
}

// Function to apply a Pauli X gate to a qubit
function applyPauliX(qubit) {
  const x = math.matrix([[0, 1], [1, 0]]);
  return math.multiply(x, qubit);
}

// Function to encode a message using the BB84 protocol
function encodeMessage(message, basis) {
  let completeMessage = "";
  for (let i = 0; i < message.length; i++) {
    // Generate a random bit to determine the encoding basis
    let encodingBasis = Math.floor(Math.random() * 2);
    // Apply the encoding basis to the qubit
    let qubit;
    if (encodingBasis === 0) {
      qubit = math.matrix([[Number(message[i])], [0]]);
    } else {
      qubit = math.matrix([[0], [Number(message[i])]]);
    }
    // Apply a Hadamard gate if the basis is different from the measurement basis
    if (basis[i] !== encodingBasis) {
      qubit = applyHadamard(qubit);
    }
    // Append the qubit to the complete message
    completeMessage += qubit.toString() + ",";
  }
  // Remove the trailing comma and return the complete message
  return completeMessage.slice(0, -1);
}

// Function to measure a qubit using the BB84 protocol
function measureQubit(qubit, basis) {
  // Apply a Hadamard gate if the basis is different from the encoding basis
  if (basis === 1) {
    qubit = applyHadamard(qubit);
  }
  // Measure the qubit and return the result
  let measurement = Math.floor(Math.random() * 2);
  if (measurement === 0) {
    return qubit.get([0, 0]);
  } else {
    return qubit.get([1, 0]);
  }
}

// Function to decode a message using the BB84 protocol
function decodeMessage(message, basis) {
  let decodedMessage = "";
  let qubits = message.split(",");
  for (let i = 0; i < qubits.length; i++) {
    // Convert the qubit back to a matrix
    let qubit = math.matrix(JSON.parse(qubits[i]));
    // Measure the qubit using the measurement basis
    let measurement = measureQubit(qubit, basis[i]);
    // Add the measured bit to the decoded message
    decodedMessage += Math.round(measurement).toString();
  }
  return decodedMessage;
}

// Initialize the message and basis
let message = "10101010";
let basis = generateRandomBits(message.length);

// Encode the message using the BB84 protocol
let encodedMessage = encodeMessage(message, basis);

// Print the encoded message and basis
console.log("Encoded Message: " + encodedMessage);
console.log("Basis: " + basis);

// Decode the message using the BB84 protocol
let decoded = "";
for (let i = 0; i < message.length; i++) {
if (basis[i] === "H") {
const result = measureHadamard(message[i]);
decoded += result;
} else if (basis[i] === "X") {
const result = measurePauliX(message[i]);
decoded += result;
} else {
// If the basis is invalid, skip this qubit
continue;
}
}

// Function to measure a qubit in the Hadamard basis
function measureHadamard(qubit) {
// Apply the Hadamard gate to the qubit
const superposition = applyHadamard(qubit);

// Measure the qubit in the standard basis
const probabilities = measureQubit(superposition);
const measurement = randomOutcome(probabilities);

// Convert the measurement outcome to a string
return measurement.toString();
}

// Function to measure a qubit in the Pauli X basis
function measurePauliX(qubit) {
// Apply the Pauli X gate to the qubit
const result = applyPauliX(qubit);

// Measure the qubit in the standard basis
const probabilities = measureQubit(result);
const measurement = randomOutcome(probabilities);

// Convert the measurement outcome to a string
return measurement.toString();
}

// Function to measure a qubit in the standard basis
function measureQubit(qubit) {
const probabilities = [
math.pow(math.abs(qubit.get([0, 0])), 2),
math.pow(math.abs(qubit.get([1, 0])), 2),
];
return probabilities;
}

// Function to randomly choose an outcome based on probabilities
function randomOutcome(probabilities) {
const random = Math.random();
let sum = 0;
for (let i = 0; i < probabilities.length; i++) {
sum += probabilities[i];
if (random < sum) {
return i;
}
}
}




