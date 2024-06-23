<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import type { PageData } from './$types';
	import ConfirmPasswordResetForm from '$lib/auth/confirm-password-reset/confirm-password-reset-form.svelte';

	export let data: PageData;
</script>

<Seo
	title={$LL.confirmPasswordResetPage.title()}
	description={$LL.confirmPasswordResetPage.description()}
	keywords={$LL.confirmPasswordResetPage.keywords()}
/>

<ConfirmPasswordResetForm data={data.form} />
