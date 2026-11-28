# Range Sum Query 2D - Immutable

**Difficulty:** Medium

**Reference:** [LeetCode Problem #304](https://leetcode.com/problems/range-sum-query-2d-immutable/description/)

## Description

Given a 2D matrix `matrix`, handle multiple queries of the following type:

- Calculate the **sum** of the elements of `matrix` inside the rectangle defined by its **upper left corner** `(row1, col1)` and **lower right corner** `(row2, col2)`.

Implement the `NumMatrix` class:

- `NumMatrix(int[][] matrix)` Initializes the object with the integer matrix `matrix`.
- `int sumRegion(int row1, int col1, int row2, int col2)` Returns the **sum** of the elements of `matrix` inside the rectangle defined by its **upper left corner** `(row1, col1)` and **lower right corner** `(row2, col2)`.

You must design an algorithm where `sumRegion` works on `O(1)` time complexity.

Example 1:
![sum-grid.jpg](https://assets.leetcode.com/uploads/2021/03/14/sum-grid.jpg)

> **Input**
> `["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]`
> `[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]`
>
> **Output**
> `[null, 8, 11, 12]`
>
> **Explanation**
> `NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);`
> `numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)`
> `numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)`
> `numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)`

**Constraints:**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `-104 <= matrix[i][j] <= 104`
- `0 <= row1 <= row2 < m`
- `0 <= col1 <= col2 < n`
- At most `104` calls will be made to `sumRegion`.

## Solution

### 1. 2D Prefix Sum

**Time complexity:**

- Calculating the prefix sum - O(`R` x `C`)
- Getting the sub of a submatrix - O(1)

**Space complexity:** O(`R`x`C`)

> `R` represent the rows and `C` represent the columns of the matrix

**Technique Used:** Prefix Sum & Inclusion-exclusion principle

Instead of manually calculating all items in a given submatrix or calculating the prefix sum for all the rows. The cleanest approach to this problem is calculating the prefix sum for all sub matrixes that starts from `0,0` to `i,j`. We need to create a matrix that can query the sum of the submatrix where the upper left starts with `0,0` and the bottom right is `i,j` which is any place our matrix.

#### 2D prefix sums calculation

```ts
for (let row = 0; row <= matrix.length - 1; row++) {
	for (let col = 0; col <= matrix[0].length - 1; col++) {
		this.prefixSumMatrix[row][col] =
			matrix[row][col] +
			(this.prefixSumMatrix[row][col - 1] ?? 0) +
			(this.prefixSumMatrix[row - 1]?.[col] ?? 0) -
			(this.prefixSumMatrix[row - 1]?.[col - 1] ?? 0);
	}
}
```

What we do in the calculation above is we add the current value of the current cell `row, col` in the matrix to the sum of the left cell (`row, col-1`) and upper cell (`row-1, col`) of our prefix sum matrix adjacent to the current cell, and then subtracting the upper left cell (`row-1, col-1`) of the prefix sum matrix.

> Out of bounds prefix sum references defaults to `0` to handle boundary conditions.

The left cell and the upper cell prefix sum values already represents the total sum of the left region and the upper region of our submatrix.

By adding the left cell, the upper cell, and current matrix cell values; we basically cover the cumulative sum of all the cells in the submatrix. However, adding the left cell and upper cell creates addition duplication as there are parts of the left region and upper region that overlaps.

Using the **inclusion-exclusion principle**, we correct this duplication by subtracting the overlapped region to our cumulative sum. Hence the subtraction to the upper left cell at the end.

This allows us to get the prefix sum of the current `row, col` cell in O(1) time.

#### Getting the sum of a submatrix region

To get the sum of any given submatrix region inside the matrix, we can use the precomputed 2D prefix sum using the formula below.

**Submatrix region sum calculation:**

```ts
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
```

> Out of bounds prefix sum references defaults to `0` to handle boundary conditions.

We get the prefix sum value of `row2, col2` which gets the cumulative sum of the matrix starting from `0,0` to `row2,col2`, including regions outside of our target submatrix.

We remove this unwanted region by subtracting the excluded left region (`prefixSum[row2][col1-1]`) and the excluded upper region (`prefixSum[row1-1][col2]`).

However, removing the excluded left and upper region also creates a double subtraction of the overlapped cells.

We correct it by adding the overlap cells in the left region and upper region once by getting the upper left cell adjacent to the first cell of the submatrix region (`prefixSum[row1-1][col1-1]`).
