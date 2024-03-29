import type { BaseTranslation } from '../i18n-types';

const productName = 'SvelteKit Stackter';
const title = `${productName} - An awesome Sveltekit Production ready starter template`;
const description = `${productName} is a production ready starter template for Sveltekit. Discover this incredible SvelteKit production-ready starter template featuring Tailwind CSS, the shadcn-svelte UI library, Superform + Formsnap, type-safe i18n, SEO, Lottie animations, an Image component, and much more. With this template, you can bypass the setup hassle and concentrate on transforming your dreams into reality.`;

const common = {
	login: 'Login',
	logout: 'Logout',
	signup: 'Sign up',
	show: 'Show',
	hide: 'Hide',
	or: 'Or'
};

const en: BaseTranslation = {
	appName: productName,
	title,
	description,
	keywords: `sveltekit starter template, tailwind css, shadcn svelte, superform, formsnap, typesafe i18n, lottie animation, image component husky, typescript, vite, ${productName}`,
	appTwitterAccount: '@shamscorner',

	common,

	appLogo: {
		hrefTitle: description,
		alt: `${productName} Logo`
	},

	schemaMarkup: {
		type: 'Corporation',
		name: 'Memowise Inc.',
		markupDescription:
			'Memowise is a software company that builds products to help people. We are a small team of passionate developers, designers, and entrepreneurs. We are based in Dhaka, Bangladesh.',
		founder: [
			{
				type: 'Person',
				name: 'Shamim Hossain'
			},
			{
				type: 'Person',
				name: 'Masud Rana'
			},
			{
				type: 'Person',
				name: 'Shadman Nasif'
			}
		],
		foundingDate: '2023-10-02',
		contactPoint: [
			{
				type: 'ContactPoint',
				email: 'memowiseinc@gmail.com',
				telephone: '',
				contactType: 'customer service'
			}
		]
	},

	errorPage: {
		title: '404',
		subtitle: 'Not found',
		pageTitle: '404',
		description: 'Looking for help? Reach out to us at support@appdomain.com',
		keywords: 'Support, Contact, Help, 404, Not found'
	},

	homepage: {
		title: 'A production ready starter template for SvelteKit.',
		subtitle: description,
		features: 'Features',

		checkFormSubmission: 'Check form submission demo',
		goToLogin: 'Go to login page',

		emojiPicker: 'Emoji picker',

		checkGithub: 'Check Github Repo'
	},

	loginPage: {
		title: 'Welcome back',
		pageTitle: 'Log in',
		description: 'Login to your account and start accepting donations, memberships, and more.',
		keywords: 'Login, Sign in, Log in, Sign up, Register',

		form: {
			email: 'Email',
			password: 'Password',
			submit: 'Log in',
			continueWith: 'Or continue with',
			dontHaveAccount: "Don't have an account?",
			signUpButton: 'Sign up',
			forgotPassword: 'Forgot password?',
			rememberMe: 'Remember me?'
		}
	},

	errors: {
		somethingWentWrong: 'Something went wrong'
	}
};

export default en;
