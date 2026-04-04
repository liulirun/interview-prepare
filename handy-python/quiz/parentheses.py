def is_balanced(s: str) -> bool:
    """
        dict for mapping open /close
        loop, if char in values: push to stack
        if char in keys, stack pop -> (OPEN value) and compare wit dict[key] -> (CLOSE value) + if stack not null(edge case).
        finally if stack is null, if not, then still false ( single OPEN exists)
        consider edge case!
    """
    stack = []
    # Map closing brackets (keys) to their Opening pairs (values)
    mapping = {")": "(", "}": "{", "]": "["}

    print(f"Checking: {s}")

    for char in s:
        # IF Opening: only add Opening to stack to match later, no adding Closing
        if char in mapping.values():
            stack.append(char)
            print(f"  Push: {stack}")

        # ELIF Closing: Must match the most recent opener
        elif char in mapping.keys():
            # Check if stack is empty (nothing to match) or mismatch
            if not stack or mapping[char] != stack.pop():
                print(f"  ❌ Failed at '{char}'")
                return False
            print(f"  Pop:  {stack}")

    # FINAL: If stack is empty, every opener had a closer
    result = not stack
    print(f"Balanced: {result}\n")
    return result


# Test it
is_balanced("{[()]}")
