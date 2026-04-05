"""
Q14) Group Anagrams

AI-BEST:
- Sort each word to build a canonical grouping key.
- Time: O(n * k log k), Space: O(n * k)

AI-EASY:
- Compare each word against existing groups using character counts.
- Time: often O(n^2 * k), Space: O(n * k)
"""

from collections import Counter


def group_anagrams_best(strs: list[str]) -> list[list[str]]:
    # Step 1: Turn each word into a canonical key by sorting its letters.
    # Why: Anagrams share the same sorted character order.
    groups: dict[str, list[str]] = {}
    for word in strs:
        key = "".join(sorted(word))
        groups.setdefault(key, []).append(word)

    # Step 2: Collect the grouped lists from the hash map.
    # Why: The map has already aggregated all anagrams together.
    return list(groups.values())


def group_anagrams_easy(strs: list[str]) -> list[list[str]]:
    # Step 1: Compare each word's character counts to existing groups.
    # Why: This avoids building a canonical sort key and keeps the idea very direct.
    groups: list[list[str]] = []
    signatures: list[Counter[str]] = []

    for word in strs:
        current = Counter(word)
        placed = False

        # Step 2: Reuse an existing group when the counts match.
        # Why: Matching character counts mean the words are anagrams.
        for idx, signature in enumerate(signatures):
            if signature == current:
                groups[idx].append(word)
                placed = True
                break

        # Step 3: Start a new group when no match exists.
        # Why: This preserves the simple linear-scan strategy from the quiz notes.
        if not placed:
            groups.append([word])
            signatures.append(current)

    return groups


def run_demo() -> None:
    print("Q14: Group Anagrams")
    samples = [
        ["eat", "tea", "tan", "ate", "nat", "bat"],
        [""],
        ["abc", "bca", "cab", "foo", "ofo"],
    ]
    for strs in samples:
        print(f"Input: strs={strs}")
        print("  BEST:", group_anagrams_best(strs))
        print("  EASY:", group_anagrams_easy(strs))


if __name__ == "__main__":
    run_demo()
