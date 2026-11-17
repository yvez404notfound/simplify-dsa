import { containsDuplicate } from ".";

describe("217. Contains Duplicate", () => {
	test.each([
		[[1, 2, 3, 1], true],
		[[1, 2, 3, 4], false],
		[[1, 1, 1, 3, 3, 4, 3, 2, 4, 2], true],
		[[1], false],
		[[1, 1], true],
		[[1, 2], false],
		[[0, 0], true],
		[[-1, -2, -3, -1], true],
		[[-1, -2, -3, -4], false],
		[[-1, 0, 1], false],
		[[-1, 0, 1, -1], true],
		[[1000000000, -1000000000], false],
		[[1000000000, -1000000000, 1000000000], true],
		[[1, 2, 3, 4, 5, 1], true],
		[[1, 2, 3, 4, 5, 5], true],
		[[5, 4, 3, 2, 1], false],
		[[2, 2, 2, 2, 2], true],
		[[10, 20, 30, 40, 50], false],
		[[10, 20, 30, 40, 10], true],
		[[-1000000000, -1000000000], true],
	])("containsDuplicate(%j) should return %j", (nums, expected) => {
		expect(containsDuplicate(nums)).toBe(expected);
	});

	test("should not mutate the original array", () => {
		const nums = [3, 1, 2, 3];
		const original = [...nums];

		containsDuplicate(nums);

		expect(nums).toEqual(original);
	});

	test("should handle a large array with unique values", () => {
		const nums = Array.from({ length: 100000 }, (_, i) => i);

		expect(containsDuplicate(nums)).toBe(false);
	});

	test("should detect a duplicate in a large array", () => {
		const nums = Array.from({ length: 100000 }, (_, i) => i);
		nums[99999] = 0;

		expect(containsDuplicate(nums)).toBe(true);
	});
});
