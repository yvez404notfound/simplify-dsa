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

export { LRUCache };
