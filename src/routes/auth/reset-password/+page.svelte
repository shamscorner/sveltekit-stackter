<script lang="ts">
	import ForgotPasswordForm from '$lib/auth/reset-password/reset-password-form.svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Seo
	title={$LL.resetPasswordPage.title()}
	description={$LL.resetPasswordPage.description()}
	keywords={$LL.resetPasswordPage.keywords()}
/>

<ForgotPasswordForm data={data.form} />
