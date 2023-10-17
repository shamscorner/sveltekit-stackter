<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
</script>

<Seo
	title={`${$LL.errorPage.pageTitle()} | ${$LL.title()}`}
	description={$LL.errorPage.description()}
	keywords={$LL.errorPage.keywords()}
/>

<main>
	<h1 class="text-3xl">404!</h1>
</main>
