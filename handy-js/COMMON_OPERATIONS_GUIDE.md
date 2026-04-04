# Common Operations (JS)

Practical, interview-ready operations by type:

- `interview_fundamental/datastruct_array_builtin_interview.js`
- `interview_fundamental/datastruct_map_builtin_interview.js`
- `interview_fundamental/datastruct_string_builtin_interview.js`
- `interview_fundamental/datastruct_set_builtin_interview.js`
- `interview_fundamental/datastruct_object_builtin_interview.js`

## Included operations

- `Array`: `dedupeStable`, `chunk`, `partition`, `rotateRight`, `twoSumIndices`
- `Map`: `countBy`, `groupByToMap`, `invertMap`, `mapValues`, `mergeFrequencyMaps`
- `String`: `isAnagram`, `longestCommonPrefix`, `reverseWords`, `isPalindromeNormalized`, `firstNonRepeatingChar`
- `Set`: `union`, `intersection`, `isSubset`, `difference`, `symmetricDifference`
- `Object`: `deepGet`, `pick`, `omit`, `deepSet`, `shallowEqual`

## Built-in methods list helpers

Each file also exposes a helper to view common built-in methods:

- `listCommonArrayBuiltins()`
- `listCommonMapBuiltins()`
- `listCommonStringBuiltins()`
- `listCommonSetBuiltins()`
- `listCommonObjectBuiltins()`

Each file also exposes examples for those built-ins:

- `listCommonArrayBuiltinExamples()`
- `listCommonMapBuiltinExamples()`
- `listCommonStringBuiltinExamples()`
- `listCommonSetBuiltinExamples()`
- `listCommonObjectBuiltinExamples()`

## How to test

Run all tests:

```bash
npm test
```

Run only common operations tests:

```bash
npm run test:common
```

Run self-tests directly per file:

```bash
node interview_fundamental/datastruct_array_builtin_interview.js
node interview_fundamental/datastruct_map_builtin_interview.js
node interview_fundamental/datastruct_string_builtin_interview.js
node interview_fundamental/datastruct_set_builtin_interview.js
node interview_fundamental/datastruct_object_builtin_interview.js
```

When you run each file directly, it prints:
- the built-in method list
- concrete examples for every listed built-in
