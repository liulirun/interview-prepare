"""
Q2) Compress String (Run-Length Encoding)

AI-BEST:
- Use list builder then "".join once.
- Time: O(n), Space: O(n)

AI-EASY:
- Build output via direct string concatenation.
- Time: can degrade to O(n^2), Space: O(n)
"""


def compress_string_best(s: str) -> str:
    if not s:
        return ""

    parts: list[str] = []
    count = 1

    for i in range(1, len(s) + 1):
        if i < len(s) and s[i] == s[i - 1]:
            count += 1
        else:
            parts.append(f"{s[i - 1]}{count}")
            count = 1

    compressed = "".join(parts)
    return compressed if len(compressed) < len(s) else s


def compress_string_easy(s: str) -> str:
    if not s:
        return ""

    result = ""
    count = 1

    for i in range(1, len(s) + 1):
        if i < len(s) and s[i] == s[i - 1]:
            count += 1
        else:
            result += f"{s[i - 1]}{count}"
            count = 1

    return result if len(result) < len(s) else s


def run_demo() -> None:
    print("Q2: Compress String")
    samples = ["aabcccccaaa", "abc", "", "aaAA"]
    for s in samples:
        print(f'Input: "{s}"')
        print("  BEST:", compress_string_best(s))
        print("  EASY:", compress_string_easy(s))


if __name__ == "__main__":
    run_demo()
