<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
	import BackButton from './back-button.svelte';
	import CardHeaderWrapper from './card-header-wrapper.svelte';
	import SocialOptions from './social-options.svelte';

	export let headerLabel: string;
	export let backButtonLabel: string;
	export let backButtonHref: string;
	export let showSocial = false;
</script>

<Card class="w-[400px] shadow-md">
	<CardHeader>
		<CardHeaderWrapper label={headerLabel}></CardHeaderWrapper>
	</CardHeader>
	<CardContent>
		<slot />
	</CardContent>
	{#if showSocial}
		<CardFooter>
			<SocialOptions />
		</CardFooter>
	{/if}
	<CardFooter>
		<BackButton label={backButtonLabel} href={backButtonHref} class="mx-auto w-fit"></BackButton>
	</CardFooter>
</Card>
