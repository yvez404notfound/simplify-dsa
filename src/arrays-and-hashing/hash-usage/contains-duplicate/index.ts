// const containsDuplicate = (nums: number[]): boolean => {
// 	const set = new Set(nums);
// 	return nums.length > set.size;
// };

const containsDuplicate = (nums: number[]): boolean => {
	let hash: Record<number, number> = {};

	for (let i = 0; i < nums.length; i++) {
		if (hash[nums[i]] !== undefined && i > 0) return true;
		hash[nums[i]] = nums[i];
	}

	return false;
};

export { containsDuplicate };
