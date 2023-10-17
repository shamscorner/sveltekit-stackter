<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import AppBackground from '$lib/components/common/AppBackground.svelte';
	import Image from '@zerodevx/svelte-img';
	import LandingImage from '$lib/assets/images/landing-page.png?as=run:0';
</script>

<Seo
	title={$LL.title()}
	description={$LL.description()}
	keywords={$LL.keywords()}
/>

<AppBackground />

<main class="relative mx-auto max-w-5xl px-5 py-10 sm:px-8">
	<div class="grid grid-cols-1 place-items-center gap-10 md:grid-cols-2">
		<div class="space-y-6 pt-5 md:pt-10">
			<h1
				class="max-w-lg text-2xl font-extrabold md:text-4xl md:leading-[3rem]"
			>
				{$LL.homepage.title()}
			</h1>
			<h2 class="max-w-lg font-medium md:text-lg">
				{$LL.homepage.subtitle()}
			</h2>
		</div>

		<div class="p-4">
			<Image
				src={LandingImage}
				alt={$LL.appName()}
				loading="eager"
				class="w-full"
			/>
		</div>
	</div>

	<div class="mt-20">
		<h2 class="text-xl font-bold">{$LL.homepage.features()}:</h2>

		<ul class="list-disc pl-5">
			<li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
			<li>
				<a href="https://www.shadcn-svelte.com/">shadcn-svelte</a> UI library
			</li>
			<li>
				<a href="https://superforms.rocks/">Superforms</a> for auto form validation
				and SSR submission
			</li>
			<li>
				<a href="https://www.formsnap.dev/">Formsnap</a> for auto form building
			</li>
			<li>
				<a href="https://www.npmjs.com/package/lottie-web">lottie-web</a> to show
				awesome animations
			</li>
			<li>
				<a href="https://lucide.dev/">Lucide Icons</a> an awesome icon pack with
				ease setup
			</li>
			<li>
				<a href="https://github.com/ivanhofer/typesafe-i18n">Typesafe i18n</a> for
				better i18n experience with SSR support
			</li>
			<li>
				<a href="https://www.npmjs.com/package/taze">Taze</a> to update dependencies
				with one command
			</li>
			<li>
				<a href="https://www.npmjs.com/package/husky">Husky</a> + (lint-staged) to
				improve commits & formatting
			</li>
			<li>
				<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs"
					>Fingerprintjs</a
				> to generate browser hash
			</li>
			<li>
				<a href="https://svelte-headlessui.goss.io/docs/2.0"
					>Svelte Headless UI</a
				>
			</li>
			<li>
				<a href="https://github.com/zerodevx/svelte-img"
					>React equivalent Image component</a
				>
			</li>
			<li>
				<a href="https://www.npmjs.com/package/fontaine">Fontaine</a> for better
				font fallback
			</li>
			<li>Awesome Emoji Picker</li>
			<li>Google Tag support</li>
			<li>Eslint & Prettier for better code formatting</li>
			<li>Tailwind CSS auto class sorting with prettier</li>
			<li>pnpm by default</li>
			<li>of course VITE and Typescript</li>
		</ul>
	</div>
</main>
