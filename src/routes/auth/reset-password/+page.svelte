<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import type { PageData } from './$types';
	import ForgotPasswordForm from '$lib/auth/reset-password/reset-password-form.svelte';

	export let data: PageData;
</script>

<Seo
	title={$LL.resetPasswordPage.title()}
	description={$LL.resetPasswordPage.description()}
	keywords={$LL.resetPasswordPage.keywords()}
/>

<ForgotPasswordForm data={data.form} />
