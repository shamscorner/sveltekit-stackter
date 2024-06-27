<script lang="ts">
	import { onMount } from 'svelte';

	import { logoutRoute } from '$lib/auth/routes';
	import Seo from '$lib/components/common/SEO.svelte';
	import { Button } from '$lib/components/ui/button';
	import { LL } from '$lib/i18n/i18n-svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		console.log('data', data.user);
	});
</script>

<Seo
	title={$LL.dashboardPage.title()}
	description={$LL.dashboardPage.description()}
	keywords={$LL.dashboardPage.keywords()}
/>

<h1>Dashboard page!</h1>

<Button href={logoutRoute}>{$LL.common.logout()}</Button>
