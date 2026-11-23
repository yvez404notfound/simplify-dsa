# Valid Anagram

Difficulty: Easy

Reference: [LeetCode problem # 242](https://leetcode.com/problems/valid-anagram/)

## Description

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

**Example 1:**

> **Input:**
>
> ```ts
> const s: string = "anagram";
> const t: string = "nagaram";
> ```
>
> **Output**: true

**Example 2:**

> **Input:**
>
> ```ts
> const s: string = "rat";
> const t: string = "car";
> ```
>
> **Output**: false

**Constraints:**

- `1 <= s.length, t.length <= 5 * 104`
- `s` and `t` consist of lowercase English letters.

## Solution

### 1. Hash Table Letters Frequency

Time Complexity: O(n)

Space Complexity: O(n)

On this approach, we count the letters frequency of the 2 words storing it in the object. After that we compare each letter of the two words if they have the same letter frequency.

```ts
const isAnagram = (s: string, t: string): boolean => {
	type WordCount = Record<string, number>;

	if (s.length !== t.length) return false;

	let word1count: WordCount = {};
	let word2count: WordCount = {};

	for (let i = 0; i < s.length; i++) {
		word1count[s[i]] = (word1count[s[i]] ?? 0) + 1;
		word2count[t[i]] = (word2count[t[i]] ?? 0) + 1;
	}

	for (const key in word1count) {
		if (word1count[key] !== word2count[key]) return false;
	}

	return true;
};
```

### 2. Hash Table Letter Balancing

Time complexity: O(n)

Space Complexity: O(1)

The English alphabet contains 26 letters and each of this letter has a character encoding that computer takes in order for it to understand the letter. We can use this to represent the alphabets as indexes in the array (`A-Z = 0-25`). We iterate to both letters at the same time (given they have the same length) and use it to balance the values on the indexes.

The first word letter adds a value while the second word letter negates the current value. A valid anagram should balance these values to all have `0`. An unbalanced array makes it invalid.

```ts
const isAnagram = (s: string, t: string): boolean => {
	if (s.length !== t.length) return false;

	// To offset the first letter "a" to 0
	const charCodeLetterStart = 97;

	let lettersCount: number[] = Array.from({ length: 26 }, () => 0);

	for (let i = 0; i < s.length; i++) {
		const sLetterCode = s[i].charCodeAt(0) - charCodeLetterStart;
		const tLetterCode = t[i].charCodeAt(0) - charCodeLetterStart;

		lettersCount[sLetterCode]++;
		lettersCount[tLetterCode]--;
	}

	return lettersCount.every((val) => val === 0);
};
```
