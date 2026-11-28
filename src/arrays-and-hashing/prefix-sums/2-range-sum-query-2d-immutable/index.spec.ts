import NumMatrix from ".";

describe("Range Sum Query 2D - Immutable", () => {
	test("should pass the official LeetCode example", () => {
		const matrix = new NumMatrix([
			[3, 0, 1, 4, 2],
			[5, 6, 3, 2, 1],
			[1, 2, 0, 1, 5],
			[4, 1, 0, 1, 7],
			[1, 0, 3, 0, 5],
		]);

		expect(matrix.sumRegion(2, 1, 4, 3)).toBe(8);
		expect(matrix.sumRegion(1, 1, 2, 2)).toBe(11);
		expect(matrix.sumRegion(1, 2, 2, 4)).toBe(12);
	});

	test("should handle a single-element matrix", () => {
		const matrix = new NumMatrix([[5]]);

		expect(matrix.sumRegion(0, 0, 0, 0)).toBe(5);
	});

	test("should handle a single-row matrix", () => {
		const matrix = new NumMatrix([[1, 2, 3, 4, 5]]);

		expect(matrix.sumRegion(0, 0, 0, 4)).toBe(15);
		expect(matrix.sumRegion(0, 1, 0, 3)).toBe(9);
	});

	test("should handle a single-column matrix", () => {
		const matrix = new NumMatrix([[1], [2], [3], [4], [5]]);

		expect(matrix.sumRegion(0, 0, 4, 0)).toBe(15);
		expect(matrix.sumRegion(1, 0, 3, 0)).toBe(9);
	});

	test("should handle a non-square matrix", () => {
		const matrix = new NumMatrix([
			[1, 2, 3],
			[4, 5, 6],
		]);

		expect(matrix.sumRegion(0, 0, 1, 2)).toBe(21);
		expect(matrix.sumRegion(0, 1, 1, 2)).toBe(16);
	});

	test("should handle negative numbers", () => {
		const matrix = new NumMatrix([
			[-1, -2],
			[-3, -4],
		]);

		expect(matrix.sumRegion(0, 0, 1, 1)).toBe(-10);
		expect(matrix.sumRegion(0, 1, 1, 1)).toBe(-6);
	});

	test("should handle a matrix containing only zeros", () => {
		const matrix = new NumMatrix([
			[0, 0],
			[0, 0],
		]);

		expect(matrix.sumRegion(0, 0, 1, 1)).toBe(0);
		expect(matrix.sumRegion(1, 1, 1, 1)).toBe(0);
	});

	test("should handle mixed positive and negative numbers", () => {
		const matrix = new NumMatrix([
			[1, -2, 3],
			[-4, 5, -6],
			[7, -8, 9],
		]);

		expect(matrix.sumRegion(0, 0, 2, 2)).toBe(5);
		expect(matrix.sumRegion(1, 1, 2, 2)).toBe(0);
	});

	test("should handle single-cell queries", () => {
		const matrix = new NumMatrix([
			[1, 2],
			[3, 4],
		]);

		expect(matrix.sumRegion(0, 0, 0, 0)).toBe(1);
		expect(matrix.sumRegion(0, 1, 0, 1)).toBe(2);
		expect(matrix.sumRegion(1, 0, 1, 0)).toBe(3);
		expect(matrix.sumRegion(1, 1, 1, 1)).toBe(4);
	});

	test("should handle queries along matrix boundaries", () => {
		const matrix = new NumMatrix([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);

		expect(matrix.sumRegion(0, 0, 0, 2)).toBe(6);
		expect(matrix.sumRegion(2, 0, 2, 2)).toBe(24);
		expect(matrix.sumRegion(0, 0, 2, 0)).toBe(12);
		expect(matrix.sumRegion(0, 2, 2, 2)).toBe(18);
	});

	test("should handle repeated and overlapping queries", () => {
		const matrix = new NumMatrix([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);

		expect(matrix.sumRegion(0, 0, 1, 1)).toBe(12);
		expect(matrix.sumRegion(1, 1, 2, 2)).toBe(28);
		expect(matrix.sumRegion(0, 0, 2, 2)).toBe(45);
		expect(matrix.sumRegion(0, 0, 1, 1)).toBe(12);
	});

	test("should handle minimum and maximum element values", () => {
		const matrix = new NumMatrix([
			[-10_000, 10_000],
			[10_000, 10_000],
		]);

		expect(matrix.sumRegion(0, 0, 0, 0)).toBe(-10_000);
		expect(matrix.sumRegion(0, 0, 1, 1)).toBe(20_000);
		expect(matrix.sumRegion(0, 1, 1, 1)).toBe(20_000);
	});

	test("should handle the maximum matrix dimensions", () => {
		const matrix = new NumMatrix(
			Array.from({ length: 200 }, () => Array(200).fill(10_000)),
		);

		expect(matrix.sumRegion(0, 0, 199, 199)).toBe(400_000_000);
		expect(matrix.sumRegion(100, 100, 199, 199)).toBe(100_000_000);
	});

	test("should handle the maximum of 10,000 queries", () => {
		const matrix = new NumMatrix(
			Array.from({ length: 200 }, () => Array(200).fill(1)),
		);

		for (let row = 100; row < 200; row++) {
			for (let col = 100; col < 200; col++) {
				expect(matrix.sumRegion(0, 0, row, col)).toBe((row + 1) * (col + 1));
			}
		}
	});
});
