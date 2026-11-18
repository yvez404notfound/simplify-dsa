import { twoSum } from ".";

describe("1. Two Sum", () => {
	test.each([
		[[2, 7, 11, 15], 9, [0, 1]],
		[[3, 2, 4], 6, [1, 2]],
		[[3, 3], 6, [0, 1]],
		[[1, 5, 3, 7], 10, [2, 3]],
		[[-1, -2, -3, -4, -5], -8, [2, 4]],
		[[0, 4, 3, 0], 0, [0, 3]],
		[[-3, 4, 3, 90], 0, [0, 2]],
		[[1, 2, 3, 4, 5], 9, [3, 4]],
		[[1000000000, 2, 3], 1000000003, [0, 2]],
		[[5, 75, 25], 100, [1, 2]],
	])("twoSum(%j, %i) should return %j", (nums, target, expected) => {
		expect(twoSum(nums, target).sort((a: number, b: number) => a - b)).toEqual(
			expected,
		);
	});
});
