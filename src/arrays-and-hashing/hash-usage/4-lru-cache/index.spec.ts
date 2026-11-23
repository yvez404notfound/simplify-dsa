import { LRUCache } from ".";

describe("LRU Cache", () => {
	test("should pass the official LeetCode example", () => {
		const cache = new LRUCache(2);

		cache.put(1, 1);
		cache.put(2, 2);
		expect(cache.get(1)).toBe(1);

		cache.put(3, 3);
		expect(cache.get(2)).toBe(-1);

		cache.put(4, 4);
		expect(cache.get(1)).toBe(-1);
		expect(cache.get(3)).toBe(3);
		expect(cache.get(4)).toBe(4);
	});

	test("should return -1 for missing keys", () => {
		const cache = new LRUCache(2);

		expect(cache.get(1)).toBe(-1);
		expect(cache.get(0)).toBe(-1);
	});

	test("should evict the least recently used key", () => {
		const cache = new LRUCache(2);

		cache.put(1, 10);
		cache.put(2, 20);
		cache.put(3, 30);

		expect(cache.get(1)).toBe(-1);
		expect(cache.get(2)).toBe(20);
		expect(cache.get(3)).toBe(30);
	});

	test("should update existing values without evicting", () => {
		const cache = new LRUCache(2);

		cache.put(1, 10);
		cache.put(2, 20);
		cache.put(1, 100);

		expect(cache.get(1)).toBe(100);
		expect(cache.get(2)).toBe(20);
	});

	test("should mark a key as recently used after get", () => {
		const cache = new LRUCache(2);

		cache.put(1, 10);
		cache.put(2, 20);
		expect(cache.get(1)).toBe(10);

		cache.put(3, 30);

		expect(cache.get(2)).toBe(-1);
		expect(cache.get(1)).toBe(10);
		expect(cache.get(3)).toBe(30);
	});

	test("should mark a key as recently used after put", () => {
		const cache = new LRUCache(2);

		cache.put(1, 10);
		cache.put(2, 20);
		cache.put(1, 100);
		cache.put(3, 30);

		expect(cache.get(2)).toBe(-1);
		expect(cache.get(1)).toBe(100);
		expect(cache.get(3)).toBe(30);
	});

	test("should handle the minimum capacity of 1", () => {
		const cache = new LRUCache(1);

		cache.put(1, 10);
		expect(cache.get(1)).toBe(10);

		cache.put(2, 20);
		expect(cache.get(1)).toBe(-1);
		expect(cache.get(2)).toBe(20);
	});

	test("should handle boundary key and value constraints", () => {
		const cache = new LRUCache(2);

		cache.put(0, 0);
		cache.put(10_000, 100_000);

		expect(cache.get(0)).toBe(0);
		expect(cache.get(10_000)).toBe(100_000);
	});

	test("should handle the maximum capacity of 3000", () => {
		const cache = new LRUCache(3_000);

		for (let i = 0; i < 3_000; i++) {
			cache.put(i, i);
		}

		expect(cache.get(0)).toBe(0);
		expect(cache.get(2_999)).toBe(2_999);

		cache.put(3_000, 3_000);

		expect(cache.get(1)).toBe(-1);
		expect(cache.get(0)).toBe(0);
		expect(cache.get(3_000)).toBe(3_000);
	});

	test("should handle the maximum of 200,000 operations", () => {
		const cache = new LRUCache(100);

		for (let i = 0; i < 100_000; i++) {
			const key = i % 100;

			cache.put(key, i);
			expect(cache.get(key)).toBe(i);
		}

		expect(cache.get(0)).toBe(99_900);
		expect(cache.get(99)).toBe(99_999);
	});
});
