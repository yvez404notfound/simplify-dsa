# Two Sum

Difficulty: Easy

Reference: [LeetCode Problem #1](https://leetcode.com/problems/two-sum/)

## Description

You are given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:

**Input:**

```ts
const nums: number[] = [2, 7, 11, 15];

const target: number = 9;
```

**Output:** `[0,1]`

**Explanation:**
The sum of `nums[0] `and `nums[1]` is `2 + 7 = 9`, which equals the target. Therefore, the indices `[0, 1]` are returned.

### Example 2:

**Input:**

```ts
const nums: number[] = [3, 2, 4];
const target: number = 6;
```

**Output:** `[1,2]`

**Explanation:**
The sum of nums[1] and nums[2] is 2 + 4 = 6, which equals the target. Therefore, the indices [1, 2] are returned.

### Constraints:

- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- **Only one valid answer exists.**

**Follow-up:** Can you come up with an algorithm that is less than `O(n2)` time complexity?

---

## Solution

### 1. One Pass Hash Table

Time complexity: O(n)

Space complexity: O(n)

Technique used: Hash

We can get the two sum of the target by just one-pass using a little math and hash table. Each iteration we store the value and its index as key-value pair. We treat each value in the iteration as a potential addend and we calculate the `difference` between the current iteration value and the `target` to identify what number it needs to add up to the `target`. The `difference` will be used to lookup to our hash table. If the `difference` exists in the hash table it means that we have found the other addend. Therefore, getting our target two sum.

```ts
const twoSum = (nums: number[], target: number): number[] | number => {
	let possibleAddendsIdx: Record<number, number> = {};

	for (let i = 0; i < nums.length; i++) {
		const diff = target - nums[i];

		const areAddendsFound = nums[possibleAddendsIdx[diff]] === diff;
		if (areAddendsFound) return [possibleAddendsIdx[diff], i];

		possibleAddendsIdx[nums[i]] = i;
	}

	return -1;
};
```
