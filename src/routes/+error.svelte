<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import { page } from '$app/stores';
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
