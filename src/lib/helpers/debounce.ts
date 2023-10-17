export function useDebounce() {
	let timeoutId;

	const debounce = (delay, func, ...args) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(async () => {
			await func(...args);
		}, delay);
	};

	return {
		debounce
	};
}

export function debounceNode(node, params) {
	let timer;

	return {
		update() {
			clearTimeout(timer);
			timer = setTimeout(params.func, params.duration);
		},
		destroy() {
			clearTimeout(timer);
		}
	};
}
