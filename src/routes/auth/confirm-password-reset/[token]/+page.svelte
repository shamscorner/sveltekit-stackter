<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import type { PageData } from './$types';
	import ConfirmPasswordResetForm from '../components/confirm-password-reset-form.svelte';

	export let data: PageData;
</script>

<Seo
	title={$LL.confirmPasswordResetPage.title()}
	description={$LL.confirmPasswordResetPage.description()}
	keywords={$LL.confirmPasswordResetPage.keywords()}
/>

<main class="relative min-h-screen p-5 py-6 sm:px-8">
	<div class="mx-auto my-12 grid max-w-5xl place-items-center">
		<ConfirmPasswordResetForm data={data.form} />
	</div>
</main>
