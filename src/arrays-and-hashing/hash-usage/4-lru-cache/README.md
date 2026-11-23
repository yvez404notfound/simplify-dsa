# LRU Cache

**Difficulty:** Medium

**Reference:** [LeetCode Problem #146](https://leetcode.com/problems/lru-cache/description/)

## Description

Design a data structure that follows the constraints of a **[Least Recently Used (LRU) cache](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)**.

Implement the `LRUCache` class:

- `LRUCache(int capacity)` Initialize the LRU cache with **positive** size `capacity`.
- `int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.
- `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict** the least recently used key.

The functions `get` and `put` must each run in `O(1)` average time complexity.

**Example 1:**

> **Input**
> `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]`
> `[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`
> **Output**
> `[null, null, null, 1, null, -1, null, -1, 3, 4]`
>
> **Explanation**
> LRUCache lRUCache = new LRUCache(2);
> lRUCache.put(1, 1); // cache is {1=1}
> lRUCache.put(2, 2); // cache is {1=1, 2=2}
> lRUCache.get(1); // return 1
> lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
> lRUCache.get(2); // returns -1 (not found)
> lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
> lRUCache.get(1); // return -1 (not found)
> lRUCache.get(3); // return 3
> lRUCache.get(4); // return 4

**Constraints:**

- `1 <= capacity <= 3000`
- `0 <= key <= 104`
- `0 <= value <= 105`
- At most `2 * 105` calls will be made to `get` and `put`.

## Solution

### 1. **Circular Doubly Linked List** for cache storing and **Map** for lookup

**Time Complexity:**

- `get()` - O(1)
- `put()` - O(1)

**Space Complexity:** O(n)

The key idea here is to store our cache values in a circular doubly linked list for tracking and the Map for fast lookup, tail being the **least used** and head being the **recently used**.

Adding a value would populate the cache first up to its max capacity. Once the capacity has been hit the least used node will be deleted and be replaced by the node next to it (freeing 1 space to our cache), Newly added cache will be the new head shifting the list to left connecting to the previous head node .

For updating an existing key value, the fetched node would be moved as the new head and its prev and next node will be connected to each other keeping the chain in tact.

Fetching a key, will do the same.

```ts
class LRUCache {
	private readonly cache: Map<number, number> = new Map();
	private readonly capacity: number;

	constructor(capacity: number) {
		this.capacity = capacity;
	}

	public put(key: number, value: number): void {
		const keyExists: boolean = this.cache.has(key);
		let tailKey: number | undefined;

		if (this.cache.size >= this.capacity && !keyExists)
			tailKey = this.cache.keys().next().value;

		this.cache.delete(tailKey !== undefined ? tailKey : key);
		this.cache.set(key, value);
	}

	public get(key: number): number {
		const fetchedValue: number | undefined = this.cache.get(key);
		if (fetchedValue === undefined) return -1;

		this.cache.delete(key);
		this.cache.set(key, fetchedValue);

		return fetchedValue;
	}
}
```

#### Why did we use Map and not Object?

Map unlike object remembers the order of insertion. Which is huge for us as it follows the natural order of a linked list and how LRU works. The first insertion in the Map will be the last (TAIL) and the recent insertion will be first (HEAD).

With Map, we don't have have to implement the linked list using an Object (I implemented one in the `/archive.ts` if you are curious how it is implemented, it's nasty). Map already creates that connection for us.

If you want to move a an existing node you can just delete it and reinsert it again moving it at the start of the list.
