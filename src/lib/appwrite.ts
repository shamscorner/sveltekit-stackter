import { Client, Account, Graphql, Storage, Databases } from 'appwrite';
import {
	PUBLIC_APPWRITE_ENDPOINT,
	PUBLIC_APPWRITE_PROJECT_ID,
	PUBLIC_APPWRITE_PICTURES_BUCKET_ID,
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_PAGES_COLLECTION_ID
} from '$env/static/public';

export const client = new Client();

client
	.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
	.setProject(PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const graphql = new Graphql(client);
export const storage = new Storage(client);
export const database = new Databases(client);

export const picturesBucketId = PUBLIC_APPWRITE_PICTURES_BUCKET_ID;
export const databaseId = PUBLIC_APPWRITE_DATABASE_ID;
export const pagesCollectionId = PUBLIC_APPWRITE_PAGES_COLLECTION_ID;

export { ID } from 'appwrite';
