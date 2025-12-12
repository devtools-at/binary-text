/**
 * Binary/Text Converter
 * Convert between binary and text
 *
 * Online tool: https://devtools.at/tools/binary-text
 *
 * @packageDocumentation
 */

function textToBinary(text: string, addSpaces: boolean = true): string {
  const binary = text
    .split("")
    .map(char => {
      const code = char.charCodeAt(0);
      // Handle characters beyond 8-bit ASCII
      if (code > 255) {
        throw new Error(`Character "${char}" (code: ${code}) is beyond 8-bit ASCII range (0-255)`);
      }
      return code.toString(2).padStart(8, "0");
    })
    .join(addSpaces ? " " : "");

  return binary;
}

function binaryToText(binary: string): string {
  // Remove all whitespace and validate
  const cleanBinary = binary.replace(/\s/g, "");

  // Validate binary string (only 0s and 1s)
  if (!/^[01]*$/.test(cleanBinary)) {
    throw new Error("Invalid binary: only 0s and 1s are allowed");
  }

  // Must be divisible by 8
  if (cleanBinary.length % 8 !== 0) {
    throw new Error(`Invalid binary length: ${cleanBinary.length} bits (must be divisible by 8)`);
  }

  // Convert each 8-bit chunk to a character
  const text = cleanBinary
    .match(/.{8}/g)!
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join("");

  return text;
}

// Export for convenience
export default { encode, decode };
