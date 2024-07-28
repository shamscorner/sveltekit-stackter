<script lang="ts">
	import Image from '@zerodevx/svelte-img';

	import UserHiAnimationAsset from '$lib/assets/animations/user-hi.json';
	import LandingImage from '$lib/assets/images/landing-page.png?as=run:0';
	import LottieAnimation from '$lib/components/common/LottieAnimation.svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import { Icons } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<Seo title={$LL.title()} description={$LL.description()} keywords={$LL.keywords()} />

<main class="relative mx-auto max-w-5xl px-5 pb-40 sm:px-8">
	<div class="grid grid-cols-1 place-items-center gap-10 md:grid-cols-2">
		<div class="space-y-6 pt-5 md:pt-10">
			<h1 class="max-w-lg text-2xl font-extrabold md:text-4xl md:leading-[3rem]">
				{$LL.homepage.title()}
			</h1>
			<h2 class="max-w-lg font-medium md:text-lg">
				{$LL.homepage.subtitle()}
			</h2>
		</div>

		<LottieAnimation id="butterflies-animation" asset={UserHiAnimationAsset} />
	</div>

	<div class="flex flex-col gap-8 md:flex-row">
		<div class="mt-20 space-y-5">
			<h2 class="text-xl font-bold">{$LL.homepage.features()}:</h2>
			<ul class="features-list list-disc pl-5 leading-loose">
				<li>
					<a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>
				</li>
				<li>
					<a href="https://www.shadcn-svelte.com/" target="_blank"> shadcn-svelte </a> UI library
				</li>
				<li>
					<a href="https://superforms.rocks/" target="_blank">Superforms</a> for auto form validation
					and SSR submission
				</li>
				<li>
					<a href="https://www.formsnap.dev/" target="_blank">Formsnap</a> for auto form building
				</li>
				<li>
					<a href="https://www.npmjs.com/package/lottie-web" target="_blank"> lottie-web </a> to show
					awesome animations
				</li>
				<li>
					<a href="https://lucide.dev/" target="_blank">Lucide Icons</a> an awesome icon pack with ease
					setup
				</li>
				<li>
					<a href="https://github.com/ivanhofer/typesafe-i18n" target="_blank"> Typesafe i18n </a>
					for better i18n experience with SSR support
				</li>
				<li>
					<a href="https://www.npmjs.com/package/taze" target="_blank">Taze</a> to update dependencies
					with one command
				</li>
				<li>
					<a href="https://www.npmjs.com/package/husky" target="_blank">Husky</a> + (lint-staged) to
					improve commits & formatting
				</li>
				<li>
					<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs" target="_blank"
						>Fingerprintjs</a
					> to generate browser hash
				</li>
				<li>
					<a href="https://github.com/zerodevx/svelte-img" target="_blank">
						React equivalent Image component
					</a>
				</li>
				<li>
					<a href="https://www.npmjs.com/package/fontaine" target="_blank"> Fontaine </a> for better
					font fallback
				</li>
				<li>Google Tag support</li>
				<li>Eslint & Prettier for better code formatting</li>
				<li>Tailwind CSS auto class sorting with prettier</li>
				<li>pnpm by default</li>
				<li>of course VITE and Typescript</li>
			</ul>

			<div class="flex items-center gap-2">
				<Button
					variant="secondary"
					href="https://github.com/shamscorner/sveltekit-stackter"
					target="_blank"
				>
					{$LL.homepage.checkGithub()}
				</Button>
				<Button
					href="https://twitter.com/shamscorner"
					target="_blank"
					variant="outline"
					size="icon"
				>
					<Icons.twitter class="h-4 w-4" />
				</Button>
			</div>
		</div>

		<div class="flex-1">
			<div class="space-y-5 py-10 text-center">
				<p class="text-lg font-semibold">
					{$LL.homepage.checkFormSubmission()}
				</p>
				<Button href="/login">
					{$LL.homepage.goToLogin()}
					<Icons.arrowRight class="ml-2 h-4 w-4" />
				</Button>
			</div>

			<div class="space-y-8 text-center">
				<Image src={LandingImage} alt={$LL.appName()} loading="eager" class="mx-auto mt-16 w-96" />
			</div>
		</div>
	</div>
</main>

<style>
	.features-list a {
		@apply font-semibold text-primary underline;
	}
</style>
