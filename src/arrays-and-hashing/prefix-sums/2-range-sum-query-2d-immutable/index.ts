class NumMatrix {
	private readonly prefixSumMatrix: number[][];

	constructor(matrix: number[][]) {
		this.prefixSumMatrix = Array.from({ length: matrix.length }, () =>
			Array.from({ length: matrix[0].length }, () => 0),
		);

		for (let row = 0; row <= matrix.length - 1; row++) {
			for (let col = 0; col <= matrix[0].length - 1; col++) {
				this.prefixSumMatrix[row][col] =
					matrix[row][col] +
					(this.prefixSumMatrix[row][col - 1] ?? 0) +
					(this.prefixSumMatrix[row - 1]?.[col] ?? 0) -
					(this.prefixSumMatrix[row - 1]?.[col - 1] ?? 0);
			}
		}
	}

	public sumRegion(
		row1: number,
		col1: number,
		row2: number,
		col2: number,
	): number {
		const sum =
			this.prefixSumMatrix[row2][col2] -
			(this.prefixSumMatrix[row2][col1 - 1] ?? 0) -
			(this.prefixSumMatrix[row1 - 1]?.[col2] ?? 0) +
			(this.prefixSumMatrix[row1 - 1]?.[col1 - 1] ?? 0);

		return sum;
	}
}

export default NumMatrix;
