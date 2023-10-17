export type StoredItem = {
	value: any;
	expiry: number;
};

export function saveToLocalStorageWithExpiry(
	key: string,
	value: any,
	expiryDays: number
): void {
	const now = new Date();
	const expiryDate = new Date(now.getTime() + expiryDays * 24 * 60 * 60 * 1000);

	const item: StoredItem = {
		value: value,
		expiry: expiryDate.getTime()
	};

	localStorage.setItem(key, JSON.stringify(item));
}

export function getFromLocalStorageWithExpiry(key: string): any {
	const itemJson = localStorage.getItem(key);

	if (!itemJson) {
		return null;
	}

	const item: StoredItem = JSON.parse(itemJson);
	const now = new Date();

	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}

	return item.value;
}
