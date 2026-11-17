# Contains Duplicate

Difficulty: Easy

Reference: [LeetCode Problem #217](https://leetcode.com/problems/contains-duplicate/description/)

## Description

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

Example 1:

> Input: nums = [1,2,3,1]
> Output: true
> Explanation:
> The element 1 occurs at the indices 0 and 3.

Example 2:

> Input: nums = [1,2,3,4]
> Output: false
> Explanation:
> All elements are distinct.

Example 3:

> Input: nums = [1,1,1,3,3,4,3,2,4,2]
> Output: true

---

## Solution

#### 1. Use set and compare

Time Complexity: O(n)

Space Complexity: O(n)

Set is type of data that stores unique values. We can use this to identify if an array contains a duplicated value. We create a Set out of the given array and it will filter out the duplicates. We can then compare the length of our created Set and the original array.

```ts
const containsDuplicate = (nums: number[]): boolean => {
	const set = new Set<number>(nums);
	return nums.length > set.size;
};
```

### 2. Hash

Time Complexity: O(n)

Space Complexity: O(n)

Technique used: Hash

We use object to store the value count of each item. Each iteration we will check if the value already exists in the hash and check if its count is above 0. This will let us know if the array contains a duplicate.

```ts
const containsDuplicate = (nums: number[]): boolean => {
	let hash: Record<number, number> = {};

	for (let i = 0; i < nums.length; i++) {
		if (hash[nums[i]] !== undefined && i > 0) return true;
		hash[nums[i]] = nums[i];
	}

	return false;
};
```
