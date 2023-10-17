function formatCurrency(
	amount: number,
	isIncludeFraction = false,
	style = 'currency',
	locale = 'en-US',
	currencyCode = 'USD'
): string {
	const formatter = new Intl.NumberFormat(locale, {
		style,
		currency: currencyCode,
		maximumFractionDigits: isIncludeFraction ? undefined : 0
	});
	return formatter.format(amount);
}

export default formatCurrency;
