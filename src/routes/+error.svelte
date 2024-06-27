<script lang="ts">
	import { page } from '$app/stores';
	import Seo from '$lib/components/common/SEO.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<Seo
	title={`${$LL.errorPage.pageTitle()} | ${$LL.title()}`}
	description={$LL.errorPage.description()}
	keywords={$LL.errorPage.keywords()}
/>

<main class="grid h-full place-content-center gap-2 text-center">
	<h1 class="text-3xl">{$page.status}</h1>
	<p>{$page.error?.message}!</p>
</main>
