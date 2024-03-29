<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import type { PageData } from './$types';
	import LoginForm from './components/login-form.svelte';

	export let data: PageData;
</script>

<Seo
	title={$LL.loginPage.title()}
	description={$LL.loginPage.description()}
	keywords={$LL.loginPage.keywords()}
/>

<main class="relative min-h-screen p-5 py-6 sm:px-8">
	<div class="mx-auto my-12 grid max-w-5xl place-items-center">
		<LoginForm data={data.form} />
	</div>
</main>
