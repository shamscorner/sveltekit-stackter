import type { AppwriteException } from 'appwrite';

export type linkTarget = '_blank' | '_self' | '_parent' | '_top';

export type FpType = {
	landing: string;
	referrer: string;
	referrerUrl: string;
	ua: string;
	rc: string;
};

export type GlobalResponseType<T> = {
	successful: boolean;
	data?: T;
	error?: AppwriteException;
};
