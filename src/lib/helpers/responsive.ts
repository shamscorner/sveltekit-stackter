export const responsiveSizes = {
	xs: 390,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
	'3xl': 2100
} as const;

export const screenInfo = {
	isXs: false,
	isSm: false,
	isMd: false,
	isLg: false,
	isXl: false,
	is2Xl: false,
	is3Xl: false,
	width: 0
};

export function handleResize() {
	screenInfo.width = window.innerWidth;

	for (const key in screenInfo) {
		screenInfo[key] = false;
	}

	switch (true) {
		case screenInfo.width < responsiveSizes.xs:
			screenInfo.isXs = true;
			break;
		case screenInfo.width >= responsiveSizes.sm && screenInfo.width < responsiveSizes.md:
			screenInfo.isSm = true;
			break;
		case screenInfo.width >= responsiveSizes.md && screenInfo.width < responsiveSizes.lg:
			screenInfo.isMd = true;
			break;
		case screenInfo.width >= responsiveSizes.lg && screenInfo.width < responsiveSizes.xl:
			screenInfo.isLg = true;
			break;
		case screenInfo.width >= responsiveSizes.xl && screenInfo.width < responsiveSizes['2xl']:
			screenInfo.isXl = true;
			break;
		case screenInfo.width >= responsiveSizes['2xl'] && screenInfo.width < responsiveSizes['3xl']:
			screenInfo.is2Xl = true;
			break;
		case screenInfo.width >= responsiveSizes['3xl']:
			screenInfo.is3Xl = true;
			break;
		default:
			break;
	}
}

export function registerResizeEvent() {
	if (typeof window === 'undefined') return;

	window.addEventListener('resize', handleResize);
	window.dispatchEvent(new Event('resize'));
}

export function unregisterResizeEvent() {
	if (typeof window === 'undefined') return;

	window.removeEventListener('resize', handleResize);
}
