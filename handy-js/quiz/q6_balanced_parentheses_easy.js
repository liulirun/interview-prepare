/**
 * Q6) Balanced Parentheses
 *
 * AI-BEST:
 * Stack-based parser.
 * Time: O(n), Space: O(n)
 *
 * AI-EASY:
 * Repeatedly remove () {} [] until unchanged.
 * Time: usually O(n^2) or worse, Space: O(n)
 */

function isBalancedBest(s) {
  // Step 1 (BEST): prepare stack and bracket mappings.
  const stack = [];
  const closeToOpen = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  const opening = new Set(["(", "{", "["]);

  // Step 2 (BEST): push opening brackets, validate on closing brackets.
  for (const ch of s) {
    if (opening.has(ch)) {
      stack.push(ch);
    } else if (ch in closeToOpen) {
      if (stack.length === 0 || stack.pop() !== closeToOpen[ch]) {
        return false;
      }
    }
  }

  // Step 3 (BEST): valid only if no unmatched opening brackets remain.
  return stack.length === 0;
}

function isBalancedEasy(s) {
  // Step 1 (EASY): repeatedly remove direct pairs.
  let current = s;

  // Step 2 (EASY): stop when no reduction occurs.
  while (true) {
    const next = current.replaceAll("()", "").replaceAll("{}", "").replaceAll("[]", "");
    if (next.length === current.length) break;
    current = next;
  }

  // Step 3 (EASY): empty result means balanced.
  return current.length === 0;
}

function runDemo() {
  console.log("Q6: Balanced Parentheses");
  const samples = ["{[()]}", "([)]", "(((", "", "a+(b*c)-{d/e}"];

  for (const s of samples) {
    console.log(`Input: "${s}"`);
    console.log("  BEST:", isBalancedBest(s));
    console.log("  EASY:", isBalancedEasy(s.replace(/[^(){}\[\]]/g, "")));
  }
}

runDemo();
