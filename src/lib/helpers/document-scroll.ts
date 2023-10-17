export function scrollToInPage(
	xPosition = 0,
	yPosition = 1,
	isSmooth = false,
	method: 'scrollBy' | 'scrollTo' = 'scrollTo'
) {
	if (isSmooth) {
		document.documentElement.style.scrollBehavior = 'smooth';
	}
	window[method](xPosition, yPosition);
	if (isSmooth) {
		document.documentElement.style.scrollBehavior = '';
	}
}
