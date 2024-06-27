import FingerprintJS from '@fingerprintjs/fingerprintjs';

import { PUBLIC_LANDING_PAGE } from '$env/static/public';
import type { FpType } from '$lib/types';
import type { AnalyticsDto } from '$lib/types';

export async function getBrowserHash() {
	const fp = await FingerprintJS.load();
	const { visitorId } = await fp.get();
	return visitorId;
}

export async function getSiteAnalytics(): Promise<AnalyticsDto> {
	const fpString = localStorage.getItem('fp');

	const fp: FpType | null = JSON.parse(fpString || 'null');

	return {
		browserHash: await getBrowserHash(),
		landingPage: fp ? fp.landing || PUBLIC_LANDING_PAGE : PUBLIC_LANDING_PAGE,
		referralSiteUrl: fp ? fp.referrer || '' : '',
		userAgent: navigator.userAgent,
		isIncognitoMode: false // TODO: get cognito mode later
	};
}
