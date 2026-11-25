class NumArray {
	private readonly prefixSums: number[] = [];

	constructor(nums: number[]) {
		for (let i = 0; i <= nums.length - 1; i++) {
			this.prefixSums[i] = (this.prefixSums[i - 1] ?? 0) + nums[i];
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

export { NumArray };
