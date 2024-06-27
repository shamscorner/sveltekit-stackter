<script lang="ts">
	import RegisterForm from '$lib/auth/register/register-form.svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Seo
	title={$LL.registerPage.title()}
	description={$LL.registerPage.description()}
	keywords={$LL.registerPage.keywords()}
/>

<RegisterForm data={data.registerForm} resendEmailData={data.resendEmailForm} />
