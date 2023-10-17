<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import AppBackground from '$lib/components/common/AppBackground.svelte';
</script>

<Seo
	title={$LL.title()}
	description={$LL.description()}
	keywords={$LL.keywords()}
/>

<AppBackground />

<main
	class="relative mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-10 px-5 sm:px-8 md:grid-cols-2"
>
	<!-- left container -->
	<div class="space-y-6 pt-5 text-center md:pt-10 md:text-left">
		<h1
			class="mx-auto max-w-lg text-2xl font-extrabold md:text-4xl md:leading-[3rem]"
		>
			{$LL.homepage.title()}
		</h1>
		<h2 class="mx-auto max-w-lg font-medium md:text-lg">
			{$LL.homepage.subtitle()}
		</h2>
	</div>
	<!-- end of left container -->

	<!-- right container -->
	<div />
	<!-- end of right container -->
</main>
