//#region LRU Cache #1: Linked List and Object
type CNode = {
	prev: number | null;
	next: number | null;
	key: number;
	value: number;
};

class LRUCache {
	cache: Record<number, CNode> = {};

	tail: number | null = null;
	head: number | null = null;

	capacity: number;
	load: number = 0;

	constructor(capacity: number) {
		this.capacity = capacity;
	}

	get(key: number): number {
		const fetchedNode = this.cache[key];

		if (!fetchedNode) return -1;

		// Edge case:
		// - fetched node already at head
		// - Cache capacity at 1
		if (key === this.head || this.capacity === 1) return fetchedNode.value;

		if (this.head === null || this.tail === null)
			throw new Error("Invalid cache state: Head or Tail is null");

		// Edge case - fetched node is at tail
		if (this.tail === key) {
			// Update tail
			this.tail = this.cache[this.tail].next;
			if (this.tail !== null) this.cache[this.tail].prev = null;
		} else if (fetchedNode.prev !== null && fetchedNode.next !== null) {
			this.cache[fetchedNode.prev].next = this.cache[fetchedNode.next].key;
			this.cache[fetchedNode.next].prev = this.cache[fetchedNode.prev].key;
		}

		// Connect old head to fetched node
		const oldHead = this.cache[this.head];
		oldHead.next = fetchedNode.key;

		// Update head
		this.head = fetchedNode.key;

		// Reconnect fetched node
		fetchedNode.prev = oldHead.key;
		fetchedNode.next = null;

		return fetchedNode.value;
	}

	put(key: number, value: number): void {
		if (this.cache[key]) {
			return this.updateCache(key, value);
		}

		if (this.load !== this.capacity && !this.cache[key]) {
			return this.populateCache(key, value);
		} else {
			return this.replaceLU(key, value);
		}
	}

	populateCache(key: number, value: number) {
		const newNode: CNode = {
			prev: null,
			next: null,
			key: key,
			value: value,
		};

		this.cache[key] = newNode;

		// Initialize head & tail
		if (this.load === 0) {
			this.tail = key;
		}
		if (this.load > 0) {
			if (this.head === null || this.tail === null)
				throw new Error("Invalid cache state: Head or Tail is null");

			const oldHead = this.cache[this.head];

			oldHead.next = key;
			newNode.prev = oldHead.key;
		}

		this.head = key;

		if (this.load < this.capacity) this.load++;
	}

	replaceLU(key: number, value: number) {
		// Create node
		const newNode: CNode = {
			prev: null,
			next: null,
			key: key,
			value: value,
		};

		// Store node to lookup table
		this.cache[key] = newNode;

		if (this.head === null || this.tail === null)
			throw new Error("Invalid cache state: Head or Tail is null");

		// Edge case - max capacity is 1
		if (this.capacity === 1) {
			// Delete old node
			delete this.cache[this.head];

			// Attach head & tail to new node
			this.head = newNode.key;
			this.tail = newNode.key;

			return;
		}

		// Connect old head to new node
		const oldHead = this.cache[this.head];
		oldHead.next = newNode.key;

		// Guard clause - reset if old head prev node is tail
		if (oldHead.prev === this.tail) oldHead.prev = null;

		// Connect new tail
		const oldTailKey = this.tail;
		const newTailKey = this.cache[this.tail].next;
		delete this.cache[oldTailKey];
		this.tail = newTailKey;

		// Connect head to new node
		this.head = newNode.key;

		// Connect new node
		newNode.prev = oldHead.key;
		newNode.next = null;
	}

	updateCache(key: number, value: number) {
		const fetchedNode = this.cache[key];

		fetchedNode.value = value;

		// Edge cases:
		// - max capacity is 1
		// - Fetched node is initial node
		if (
			this.capacity === 1 ||
			this.head === key ||
			(this.head === key && this.tail === key)
		)
			return;

		if (this.head === null || this.tail === null)
			throw new Error("Invalid cache state: Head or Tail is null");

		// Edge case - updated node is tail
		if (fetchedNode.key === this.tail) {
			// Update tail
			this.tail = this.cache[this.tail].next;
			if (this.tail && this.cache[this.tail].prev !== null)
				this.cache[this.tail].prev = null;
		} else if (fetchedNode.prev !== null && fetchedNode.next !== null) {
			// Detach fetched node
			this.cache[fetchedNode.prev].next = this.cache[fetchedNode.next].key;
			this.cache[fetchedNode.next].prev = this.cache[fetchedNode.prev].key;
		}

		// Connect the old head to fetched node
		const oldHead = this.cache[this.head];
		oldHead.next = fetchedNode.key;

		// Update head
		this.head = fetchedNode.key;

		// Reconnect fetched node
		fetchedNode.prev = oldHead.key;
		fetchedNode.next = null;
	}
}
//#endregion

//#region LRU Cache #2: Doubly Linked List and Map
class LRUCache1 {
	private cache: Map<number, number>;
	private capacity: number;

	constructor(capacity: number) {
		this.capacity = capacity;
		this.cache = new Map();
	}

	put(key: number, value: number): void {
		const keyExists = this.cache.has(key);
		let tailKey: number | undefined;

		//
		if (this.cache.size >= this.capacity && !keyExists)
			tailKey = this.cache.keys().next().value;

		this.cache.delete(tailKey ? tailKey : key);
		this.cache.set(key, value);
	}

	get(key: number): number {
		const fetchedValue = this.cache.get(key);
		if (fetchedValue === undefined) return -1;

		this.cache.delete(key);
		this.cache.set(key, fetchedValue);

		return fetchedValue;
	}
}
//#endregion
