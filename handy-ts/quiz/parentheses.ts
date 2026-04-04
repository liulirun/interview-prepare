/**
 * BALANCED PARENTHESES
 */
function isBalanced(s: string): boolean {
  const stack: string[] = [];
  const mapping: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const char of s) {
    if (Object.values(mapping).includes(char)) {
      stack.push(char);
    } else if (char in mapping) {
      if (stack.length === 0 || stack.pop() !== mapping[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(isBalanced("{[()]}"));

export {};

