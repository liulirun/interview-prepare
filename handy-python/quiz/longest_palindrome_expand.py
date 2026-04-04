def longest_palindrome_expand(s: str) -> str:
    """O(n2)
    odd and even, expand_and_log(s, i, i) vs expand_and_log(s, i, i + 1)
    one loop, 
    expand(find)  go both direction, with in string range + char(left) == char(right)
    """
    res = ""

    print(f"Input: '{s}'\n" + "="*50)

    for i in range(len(s)):
        print(f"\n--- 🎯 CENTER AT INDEX {i} (char: '{s[i]}') ---")

        # CASE 1: ODD length (Center is 1 character like 'aba')
        # We start both left (L) and right (R) at the same index 'i'
        print(f"  Checking ODD expansion...")
        odd_pal = expand_and_log(s, i, i)

        # CASE 2: EVEN length (Center is between 2 characters like 'abba')
        # We start L at 'i' and R at 'i+1'
        print(f"  Checking EVEN expansion...")
        even_pal = expand_and_log(s, i, i + 1)

        # Update our global best result
        for found in [odd_pal, even_pal]:
            if len(found) > len(res):
                print(f"  ⭐ NEW RECORD: '{found}' beats '{res}'")
                res = found

    print("="*50)
    print(f"FINAL RESULT: '{res}'")
    return res


def expand_and_log(s, l, r):
    """
    Helper to expand outward from a center as long as it's a palindrome.
    """
    # While we are inside the string bounds AND the characters match
    while l >= 0 and r < len(s) and s[l] == s[r]:
        print(f"    [MATCH] '{s}- {s[l:r+1]}' is valid. Expanding...")
        l -= 1
        r += 1

    # When the loop stops, l and r have gone ONE STEP TOO FAR.
    # So we slice from l+1 up to r.
    result = s[l+1:r]
    if not result:
        print(f"    [STOP] No palindrome found here.{result}")
    else:
        print(f"    Final palindrome for this center: '{result}'")
    return result


# Try it out!
longest_palindrome_expand("baabad")

# def longest_palindrome_verbose(s: str) -> str:
# """, brutal force O(n3)"""
#     longest = ""
#     # 1. OUTER LOOP: Pick a starting point (i)
#     for i in range(len(s)):
#         # 2. INNER LOOP: Pick an ending point (j)
#         for j in range(i, len(s)):
#             # Slice the string from i to j (inclusive)
#             substring = s[i: j + 1]
#             # 3. PALINDROME CHECK: Reverse it using [::-1]
#             is_palindrome = (substring == substring[::-1])
#             # --- Logging the process ---
#             print(
#                 f"Testing: '{substring.ljust(10)}' | Palindrome? {is_palindrome}")
#             # 4. RECORD BREAKER: If it's a palindrome and longer than our previous best
#             if is_palindrome and len(substring) > len(longest):
#                 print(f"  ⭐ NEW RECORD! '{substring}' is now the longest.")
#                 longest = substring
#         print("-" * 40)  # Divider after each starting letter 'i'
#     print(f"FINAL RESULT: '{longest}'")
#     return longest

# # Try it with a classic example
# longest_palindrome_verbose("abac")
