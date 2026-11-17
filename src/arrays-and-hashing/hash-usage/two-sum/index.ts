const twoSum = (nums: number[], target: number): number[] | number => {
	let possibleAddendsIdx: Record<number, number> = {};

	for (let i = 0; i < nums.length; i++) {
		const diff = target - nums[i];

		const areAddendsFound = nums[possibleAddendsIdx[diff]] === diff;
		if (areAddendsFound) return [possibleAddendsIdx[diff], i];

		possibleAddendsIdx[nums[i]] = i;
	}

	return -1;
};

export { twoSum };
