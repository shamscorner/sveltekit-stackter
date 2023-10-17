export function observeSectionVisibility(
	elSelector: string,
	callbackYes: () => void,
	callbackNo: () => void,
	threshold = 1
) {
	const targetElement = document.querySelector(elSelector);
	if (!targetElement) return;

	const intersectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (
					(entry.isIntersecting && entry.intersectionRatio >= threshold) ||
					entry.boundingClientRect.top < 0
				) {
					callbackYes();
				} else {
					callbackNo();
				}
			});
		},
		{
			threshold
		}
	);

	intersectionObserver.observe(targetElement);
}
