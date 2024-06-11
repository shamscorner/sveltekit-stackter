<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import type { PageData } from './$types';
	import RegisterForm from '$lib/components/auth/register/register-form.svelte';

	export let data: PageData;
</script>

<Seo
	title={$LL.registerPage.title()}
	description={$LL.registerPage.description()}
	keywords={$LL.registerPage.keywords()}
/>

<RegisterForm data={data.registerForm} resendEmailData={data.resendEmailForm} />
