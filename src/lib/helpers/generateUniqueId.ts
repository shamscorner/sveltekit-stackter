function generateUniqueId() {
	// convert num to base 36 and stringify
	const dateStr = Date.now().toString(36);

	// start at index 2 to skip decimal point
	const randomStr = Math.random().toString(36).substring(2, 8);

	return `${dateStr}-${randomStr}`;
}

export default generateUniqueId;
