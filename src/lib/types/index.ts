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

export type ApiResponse<D = null> = {
	code: number;
	message?: string;
	data?: D;
	error?:
		| Error
		| {
				message: string;
		  };
};
