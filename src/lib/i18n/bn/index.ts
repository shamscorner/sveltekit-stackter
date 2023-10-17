import type { Translation } from '../i18n-types';
import en from '../en';

const productName = 'SvelteKit Stackter';
const title = `${productName} - একটি বিশেষ Sveltekit প্রোডাকশন-রেডি শুরু করার টেমপ্লেট`;
const description = `${productName} একটি প্রোডাকশন-রেডি শুরু করার টেমপ্লেট সবেলটেকিটের জন্য। টেলওইন্ড সিএসএস, shadcn-svelte UI লাইব্রেরি, সুপারফর্ম + ফর্মস্ন্যাপ, টাইপ-সেফ i18n, এসইও, লটি অ্যানিমেশন, ইমেজ কম্পোনেন্ট এবং অনেক কিছু সম্মিলিত এই আপ্রোচটি ব্যবহার করে, আপনি সেটআপের ঘাঁটি পার করতে এবং আপনার স্বপ্নগুলি বাস্তবে পরিণত করতে পারেন।`;

const common = {
	login: 'লগইন',
	logout: 'লগআউট',
	signup: 'নিবন্ধন করুন',
	show: 'প্রদর্শন',
	hide: 'লুকান',
	or: 'অথবা'
};

const ar: Translation = {
	...(en as Translation),
	appName: productName,
	title,
	description,
	keywords: `স্বেলটেকিট শুরু টেমপ্লেট, টেইলওইন্ড সিএসএস, শাদচেন স্বেলটে ইউআই লাইব্রেরি, সুপারফর্ম, ফর্মস্ন্যাপ, টাইপসেফ আই১৮ন, লটি অ্যানিমেশন, ইমেজ কম্পোনেন্ট, হাস্কি, টাইপস্ক্রিপ্ট, ভাইট, ${productName}`,
	appTwitterAccount: '@shamscorner',

	common,

	appLogo: {
		hrefTitle: description,
		alt: `${productName} লোগো`
	},

	schemaMarkup: {
		type: 'কর্পোরেশন',
		name: 'মেমোউয়াইজ ইংক।',
		markupDescription:
			'মেমোউয়াইজ একটি সফটওয়্যার কোম্পানি যা মানুষদের সাহায্য করার জন্য প্রোডাক্ট তৈরি করে। আমরা একটি ছোট দল, উত্সাহী ডেভেলপার, ডিজাইনার এবং উদ্যমপাতি। আমরা ঢাকা, বাংলাদেশে বেস্ড।',
		founder: [
			{
				type: 'ব্যক্তি',
				name: 'শামিম হোসেন'
			},
			{
				type: 'ব্যক্তি',
				name: 'মাসুদ রানা'
			},
			{
				type: 'ব্যক্তি',
				name: 'শাদমান নাসিফ'
			}
		],
		foundingDate: '2023-10-02',
		contactPoint: [
			{
				type: 'যোগাযোগ পয়েন্ট',
				email: 'memowiseinc@gmail.com',
				telephone: '',
				contactType: 'গ্রাহক সেবা'
			}
		]
	},

	errorPage: {
		title: '404',
		subtitle: 'পাওয়া যায়নি',
		pageTitle: '404',
		description:
			'সাহায্য খুঁজছেন? আমাদের সাথে যোগাযোগ করুন support@appdomain.com ঠিকানায়',
		keywords: 'সাহায্য, যোগাযোগ, সাহায্য, 404, পাওয়া যায়নি'
	},

	homepage: {
		title: 'একটি অনুসরণকারী এক হাজার অনুসরণকারীর মুল্যবান।',
		subtitle:
			'দান গ্রহণ করুন। একটি সদস্যপদ শুরু করুন। আপনি যা ইচ্ছা তা বেচান - এটি আপনি চিন্তা করেছেন তা চেয়ে সহজ।'
	}
};

export default ar;
