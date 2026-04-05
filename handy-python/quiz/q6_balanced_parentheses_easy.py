"""
Q6) Balanced Parentheses

AI-BEST:
- Stack-based validation.
- Time: O(n), Space: O(n)

AI-EASY:
- Repeatedly remove pairs () {} [] until stable.
- Time: usually O(n^2) or worse, Space: O(n)
"""


def is_balanced_best(s: str) -> bool:
    stack: list[str] = []
    mapping = {")": "(", "}": "{", "]": "["}
    opening = set(mapping.values())

    for ch in s:
        if ch in opening:
            stack.append(ch)
        elif ch in mapping:
            if not stack or stack.pop() != mapping[ch]:
                return False

    return len(stack) == 0


def is_balanced_easy(s: str) -> bool:
    current = s
    while True:
        next_value = current.replace("()", "").replace("{}", "").replace("[]", "")
        if len(next_value) == len(current):
            break
        current = next_value
    return current == ""


def run_demo() -> None:
    print("Q6: Balanced Parentheses")
    samples = ["{[()]}", "([)]", "(((", "", "a+(b*c)-{d/e}"]
    for s in samples:
        filtered = "".join(ch for ch in s if ch in "(){}[]")
        print(f'Input: "{s}"')
        print("  BEST:", is_balanced_best(s))
        print("  EASY:", is_balanced_easy(filtered))


if __name__ == "__main__":
    run_demo()
