# Range Sum Query - Immutable

**Difficulty:** Medium

**Reference:** [LeetCode Problem #303](https://leetcode.com/problems/range-sum-query-immutable/)

## Description

Given an integer array `nums`, handle multiple queries of the following type:

1. Calculate the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** where `left <= right`.

Implement the `NumArray` class:

- `NumArray(int[] nums)` Initializes the object with the integer array `nums`.
- `int sumRange(int left, int right)` Returns the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** (i.e. `nums[left] + nums[left + 1] + ... + nums[right]`).

> Example 1:
> Input
> `["NumArray", "sumRange", "sumRange", "sumRange"]`
> `[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]`
> Output
> `[null, 1, -1, -3]`
>
> Explanation:
>
> ```ts
> NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
> numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
> numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
> numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
> ```

**Constraints:**

- `1 <= nums.length <= 104`
- `-105 <= nums[i] <= 105`
- `0 <= left <= right < nums.length`
- At most `104` calls will be made to `sumRange`.

## Solution

### 1. Prefix Sums

**Time Complexity:** O(1)

**Space Complexity:** O(n)

**Technique Used:** Prefix Sums

The way we get the sum of the given range has 1 direction. You must add every value of the given left index up to the given right index to get the sum. No matter how many times we call the `sumRange` the pattern will still be the same.

We can skip this brute-force way of solving it by making a **prefix sum** that the `sumRange` can use to quickly identify the sum of the given range in O(1) time. On prefix sum, we calculate every cumulative sum of each index starting from the beginning of the array.

> Example 1:
> Given array: `[1,1,1,1,1]`
> Prefix sum: `[1,2,3,4,5]`

Now that we get the prefix sum of the array we can reuse the stored values to calculate the sum range.

In the example above, if the given range is `[2,4]` we can pull up the prefix sum value of the given right index (`5`) and the prefix value of the given left index - 1 (`2`); subtract them together and we get our sum range instantly (`3`).

When we get the right index prefix sum we get the cumulative value from that index starting to that index. With that, we can just remove the values out of the left index range to get the sum of the given range.

```ts
class NumArray {
	private readonly prefixSums: number[] = [];

	constructor(nums: number[]) {
		nums.reduce((acc, curr) => {
			const sum = acc + curr;
			this.prefixSums.push(sum);
			return sum;
		}, 0);

		for (let i = 0; i <= nums.length - 1; i++) {
			this.prefixSums[i] = this.prefixSums[i - 1] ?? 0 + nums[i];
		}
	}

	public sumRange(left: number, right: number): number {
		if (left > right)
			throw Error("Left index should not be bigger than the right index");

		if (
			(right < 0 && right > this.prefixSums.length - 1) ||
			(left < 0 && left > this.prefixSums.length - 1)
		)
			throw Error("Left/Right index is out of bounds");

		return this.prefixSums[right] - (this.prefixSums[left - 1] ?? 0);
	}
}
```
