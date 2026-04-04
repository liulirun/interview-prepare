def move_zeros_right_inplace(input: str):
    char_map = {}
    for char in input:
        char_map[char] = char_map.get(char, 0) + 1

    for i in range(len(input)):
        if char_map[input[i]] == 1:
            return i

    return -1

# def move_zeros_right_inplace(input: str):
#     for i in range(len(input)):
#         char_count = input.count(input[i])
#         if char_count == 1:
#             return i
#     return -1


print(move_zeros_right_inplace('aabcc'))
print(move_zeros_right_inplace('aacc'))
