import {
	ID,
	account,
	databaseId,
	pagesCollectionId,
	database
} from '$lib/appwrite';
import type { GlobalResponseType } from '$lib/types';
import type { Models } from 'appwrite';
import { parseError } from './error.service';

export type CreatePageInput = {
	whatCreating: string;
	about: string;
	coverUrl?: string;
	featuredVideoUrl?: string;
	socialLinks?: string[];
	themeColor?: string;
	supportCount?: number;
	isHideSupportCount?: boolean;
	goalAmount?: number;
	goalDescription?: string;
	goalProgress?: number;
	googleTagId?: string;
	giftType?: string;
	giftIcon?: string;
};

export async function createNewPage(pageData: CreatePageInput) {
	let response: GlobalResponseType<Models.Document | CreatePageInput> = {
		successful: true,
		data: undefined
	};

	try {
		const accountResponse = await account.get();

		if (!accountResponse.$id) {
			throw new Error('Account not found');
		}

		const result = await database.createDocument(
			databaseId,
			pagesCollectionId,
			ID.unique(),
			{
				...pageData,
				ownerId: accountResponse.$id
			}
		);

		if (result) {
			response = {
				successful: true,
				data: result
			};
		} else {
			response.successful = false;
		}
	} catch (error: any) {
		response = parseError(error);
	}

	return response;
}
