import { NumArray } from ".";

describe("Range Sum Query - Immutable", () => {
	test("should pass the official LeetCode example", () => {
		const nums = new NumArray([-2, 0, 3, -5, 2, -1]);

		expect(nums.sumRange(0, 2)).toBe(1);
		expect(nums.sumRange(2, 5)).toBe(-1);
		expect(nums.sumRange(0, 5)).toBe(-3);
	});

	test("should handle a single-element array", () => {
		const nums = new NumArray([5]);

		expect(nums.sumRange(0, 0)).toBe(5);
	});

	test("should handle positive numbers", () => {
		const nums = new NumArray([1, 2, 3, 4, 5]);

		expect(nums.sumRange(0, 4)).toBe(15);
		expect(nums.sumRange(1, 3)).toBe(9);
	});

	test("should handle negative numbers", () => {
		const nums = new NumArray([-1, -2, -3, -4, -5]);

		expect(nums.sumRange(0, 4)).toBe(-15);
		expect(nums.sumRange(1, 3)).toBe(-9);
	});

	test("should handle an array containing only zeros", () => {
		const nums = new NumArray([0, 0, 0, 0]);

		expect(nums.sumRange(0, 3)).toBe(0);
		expect(nums.sumRange(1, 2)).toBe(0);
	});

	test("should handle mixed positive and negative numbers", () => {
		const nums = new NumArray([5, -5, 10, -10, 15]);

		expect(nums.sumRange(0, 1)).toBe(0);
		expect(nums.sumRange(1, 3)).toBe(-5);
		expect(nums.sumRange(0, 4)).toBe(15);
	});

	test("should handle queries where left equals right", () => {
		const nums = new NumArray([10, 20, 30]);

		expect(nums.sumRange(0, 0)).toBe(10);
		expect(nums.sumRange(1, 1)).toBe(20);
		expect(nums.sumRange(2, 2)).toBe(30);
	});

	test("should handle repeated values", () => {
		const nums = new NumArray([5, 5, 5, 5]);

		expect(nums.sumRange(0, 3)).toBe(20);
		expect(nums.sumRange(1, 2)).toBe(10);
	});

	test("should handle repeated and overlapping queries", () => {
		const nums = new NumArray([1, 2, 3, 4, 5]);

		expect(nums.sumRange(0, 2)).toBe(6);
		expect(nums.sumRange(1, 3)).toBe(9);
		expect(nums.sumRange(2, 4)).toBe(12);
		expect(nums.sumRange(0, 2)).toBe(6);
	});

	test("should handle minimum and maximum element values", () => {
		const nums = new NumArray([-100_000, 100_000, 100_000]);

		expect(nums.sumRange(0, 0)).toBe(-100_000);
		expect(nums.sumRange(0, 1)).toBe(0);
		expect(nums.sumRange(1, 2)).toBe(200_000);
	});

	test("should handle the maximum array length", () => {
		const nums = new NumArray(Array(10_000).fill(100_000));

		expect(nums.sumRange(0, 9_999)).toBe(1_000_000_000);
		expect(nums.sumRange(5_000, 9_999)).toBe(500_000_000);
	});

	test("should handle the maximum of 10,000 queries", () => {
		const nums = new NumArray(Array(10_000).fill(1));

		for (let i = 0; i < 10_000; i++) {
			expect(nums.sumRange(0, i)).toBe(i + 1);
		}
	});
});
