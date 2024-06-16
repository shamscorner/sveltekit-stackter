<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import { Button } from '$lib/components/ui/button';
	import Seo from '$lib/components/common/SEO.svelte';
	import { logoutRoute } from '$lib/auth/routes';
</script>

<Seo
	title={$LL.dashboardPage.title()}
	description={$LL.dashboardPage.description()}
	keywords={$LL.dashboardPage.keywords()}
/>

<h1>Dashboard page!</h1>

<Button href={logoutRoute}>{$LL.common.logout()}</Button>
