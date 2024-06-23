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
	or: 'Or',
	toggleTheme: 'Toggle theme',
	close: 'Close'
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

		checkGithub: 'Check Github Repo',

		nextAuth5: 'NextAuth 5'
	},

	loginPage: {
		title: 'Welcome back!',
		pageTitle: 'Log in',
		description:
			'Login to your account and experience learning that you have never experienced before.',
		keywords: 'Login, Sign in, Log in, Sign up, Register',

		form: {
			email: 'Email',
			password: 'Password',
			submit: 'Log in',
			continueWith: 'Or continue with',
			dontHaveAccount: "Don't have an account?",
			forgotPassword: 'Forgot password?',
			rememberMe: 'Remember me?'
		}
	},

	registerPage: {
		title: "Let's get you onboard!",
		pageTitle: 'Register',
		description:
			'Create an account and experience learning that you have never experienced before.',
		keywords: 'Login, Sign in, Log in, Sign up, Register',

		form: {
			name: 'Name',
			email: 'Email',
			password: 'Password',
			submit: 'Create an account',
			continueWith: 'Or continue with',
			alreadyHaveAccount: 'Already have an account?'
		},

		successfulRegistration: {
			title: 'Registration successful!',
			description:
				'You have successfully registered. Please check your email to verify your account.',
			haveNotGetEmail: "Haven't received the email? Click the resend button below.",
			resendEmail: 'Resend email',
			emailResentSuccessfully: 'Email resent successfully!'
		}
	},

	logoutPage: {
		title: 'Logged out!',
		pageTitle: 'Logged out',
		description: 'You have been successfully logged out.',
		keywords: 'Logout, Sign out, Log out'
	},

	resetPasswordPage: {
		title: 'Forgot your password?',
		pageTitle: 'Reset Password',
		description:
			'Forgot your password? No worries! Enter your email address and we will send you a link to reset your password.',
		keywords: 'Forgot password, Reset password, Password recovery',

		form: {
			email: 'Email',
			submit: 'Send reset link',
			alreadyHaveAccount: 'Already have an account?'
		},

		successfulPasswordResetSent: {
			title: 'Password reset email sent!',
			description:
				'An email has been sent to your email address. Please check your email to reset your password.'
		}
	},

	confirmPasswordResetPage: {
		title: 'Confirm Password Reset!',
		pageTitle: 'Confirm Password Reset',
		description:
			'Enter your new password and confirm it to reset your password. Please check your email for the password reset link.',
		keywords: 'Confirm password reset, Reset password, Password recovery',

		form: {
			password: 'Password',
			confirmPassword: 'Confirm Password',
			submit: 'Reset Password',
			dontHaveAccount: "Don't have an account?",
			alreadyHaveAccount: 'Already have an account?'
		},

		successfulPasswordReset: {
			title: 'Password reset successful!',
			description:
				'Your password has been reset successfully. You can now login with your new password.'
		}
	},

	dashboardPage: {
		title: 'Dashboard',
		pageTitle: 'Dashboard',
		description: 'Welcome to your dashboard.',
		keywords: 'Dashboard, Home, Welcome'
	},

	errors: {
		somethingWentWrong: 'Something went wrong'
	}
};

export default en;
