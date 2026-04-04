from collections import defaultdict


# def length_of_longest_substring(s: str) -> int:
#     used_chars = {}
#     start = max_length = 0

#     print(f"Input string: '{s}'\n" + "-"*40)

#     for index, char in enumerate(s):
#         print(f"Step {index}: Testing '{char}' at index {index}")

#         # Check if we hit a duplicate WITHIN the current window
#         if char in used_chars and start <= used_chars[char]:
#             old_index = used_chars[char]
#             # Log the state BEFORE the jump
#             print(
#                 f"  ⚠️  DUPLICATE! '{char}' already in window '{s[start:index]}'")

#             # Move start to the right of the previous occurrence
#             start = old_index + 1
#             print(
#                 f"  -> Jumping 'start' to index {start}. New window begins: '{s[start:index+1]}'")
#         else:
#             # No duplicate in window, so calculate new length
#             current_len = index - start + 1
#             max_length = max(max_length, current_len)
#             print(f"  ✅  UNIQUE! Current window: '{s[start:index+1]}'")
#             print(
#                 f"  -> Window length: {current_len} (Max so far: {max_length})")

#         # Update character's last seen position
#         used_chars[char] = index
#         print(f"  Dictionary updated: {char} is at index {index}\n")

#     print("-" * 40)
#     return max_length
# length_of_longest_substring("abcabcbb")

def get_longest_substring_simple(s: str) -> str:
    """
    one loop in string, find duplicate char in current_str
    if none duplicate, push to current_str
    if duplicate, start from duplicate.index + 1
    swap outside if current > existing
    """
    current_window = ""
    longest_found = ""

    print(f"Input: '{s}'\n" + "-"*30)

    for char in s:
        if char in current_window:
            # 1. FIND where the duplicate is in our current string
            duplicate_index = current_window.find(char)
            # 2. CHOP OFF the duplicate and everything before it
            # Then add the new character to the end
            current_window = current_window[duplicate_index + 1:] + char
            print(f"  -> Chopped and updated to: '{current_window}'")
        else:
            # 3. Just ADD the unique character
            current_window += char
            print(f"  -> Added unique: '{current_window}'")
        # Keep track of the longest string we've seen so far
        if len(current_window) > len(longest_found):
            longest_found = current_window

    print("-" * 30)
    return longest_found


# Example
# print("Final Result:", get_longest_substring_simple("abcdbcabcbb"))

# Try it with a string like "pwwkew" to see the "kew" window form!
