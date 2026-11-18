import { isAnagram } from ".";

describe("242. Valid Anagram", () => {
	test.each([
		// Official examples
		["anagram", "nagaram", true],
		["rat", "car", false],

		// Edge cases
		["a", "a", true],
		["a", "b", false],
		["ab", "a", false],
		["a", "ab", false],

		// Character frequency
		["aabb", "bbaa", true],
		["aabb", "abbb", false],
		["aaab", "aabb", false],
		["abc", "bca", true],

		// Character order
		["abcdef", "fedcba", true],
		["abcde", "abcdf", false],
		["aaaa", "aaaa", true],

		// Constraint boundaries
		["a".repeat(50_000), "a".repeat(50_000), true],
		["a".repeat(50_000), "a".repeat(49_999) + "b", false],
		["a".repeat(50_000), "a".repeat(49_999), false],
	])("isAnagram(%j, %j) should return %j", (s, t, expected) => {
		expect(isAnagram(s, t)).toBe(expected);
	});
});
