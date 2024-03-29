export type linkTarget = '_blank' | '_self' | '_parent' | '_top';

export type FpType = {
	landing: string;
	referrer: string;
	referrerUrl: string;
	ua: string;
	rc: string;
};

export type AnalyticsDto = {
	browserHash: string;
	landingPage: string;
	userAgent: string;
	isIncognitoMode: boolean;
	referralSiteUrl?: string | null;
};
