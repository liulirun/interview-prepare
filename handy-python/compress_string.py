def compress_string(s: str) -> str:
    """
    loop, count + 1
    if no loop in following, add a2 to res, count reset
    """
    if not s:
        return ""

    res = []
    count = 0

    for i in range(len(s)):
        count += 1
        # If next char is different or we reached the end
        if i + 1 == len(s) or s[i] != s[i+1]:
            res.append(s[i] + str(count))
            count = 0

    result = "".join(res)
    return result if len(result) < len(s) else s


print(compress_string('aabcccccaaa'))
