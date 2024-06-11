<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import type { PageData } from './$types';
	import LoginForm from '$lib/components/auth/login/login-form.svelte';

	export let data: PageData;
</script>

<Seo
	title={$LL.loginPage.title()}
	description={$LL.loginPage.description()}
	keywords={$LL.loginPage.keywords()}
/>

<LoginForm data={data.form} />
