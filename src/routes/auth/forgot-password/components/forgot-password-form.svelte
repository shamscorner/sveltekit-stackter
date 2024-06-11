<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { Heading } from '$lib/components/ui/heading';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from '../schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Icons } from '$lib/components/icons';
	import type { AnalyticsDto } from '$lib/types';
	import { PUBLIC_LANDING_PAGE } from '$env/static/public';
	import { onMount } from 'svelte';
	import { getSiteAnalytics } from '$lib/helpers/analytics';
	import { performFormValidation } from '$lib/services/error.service';
	import SuccessMessage from '$routes/components/success-message.svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	let isLoadingFormSubmit = false;
	let errorResponse = '';

	let analytics: AnalyticsDto = {
		browserHash: '',
		landingPage: PUBLIC_LANDING_PAGE,
		isIncognitoMode: false,
		referralSiteUrl: null
	};

	let isSuccessful = false;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		invalidateAll: false,
		onSubmit: () => {
			errorResponse = '';
			isLoadingFormSubmit = true;
		},
		onResult: async ({ result }) => {
			const errorMessage = performFormValidation(result);
			if (errorMessage) {
				errorResponse = errorMessage;
				isLoadingFormSubmit = false;
				return;
			}

			if (result.type === 'success' && result.data) {
				isSuccessful = true;
			}

			isLoadingFormSubmit = false;
		}
	});

	const { form: formData, enhance } = form;

	$: {
		formData.update((d) => ({
			...d,
			browserHash: analytics.browserHash,
			landingPage: analytics.landingPage || PUBLIC_LANDING_PAGE,
			referralSiteUrl: analytics.referralSiteUrl || '',
			isIncognitoMode: analytics.isIncognitoMode
		}));
	}

	onMount(async () => {
		if (navigator) {
			analytics = await getSiteAnalytics();
		}
	});
</script>

<div>
	<Heading class="mx-auto text-center">
		{$LL.forgotPasswordPage.title()}
	</Heading>
	<div class="mt-4 grid min-w-[19rem] max-w-md gap-6">
		<form method="POST" use:enhance class="space-y-4">
			<input type="hidden" name="browserHash" bind:value={$formData.browserHash} />
			<input type="hidden" name="landingPage" bind:value={$formData.landingPage} />
			<input type="hidden" name="referralSiteUrl" bind:value={$formData.referralSiteUrl} />
			<input type="hidden" name="isIncognitoMode" bind:value={$formData.isIncognitoMode} />

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>{$LL.forgotPasswordPage.form.email()}</Form.Label>
					<Input {...attrs} bind:value={$formData.email} placeholder="john@example.com" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Error show={!!errorResponse}>
				{errorResponse || $LL.errors.somethingWentWrong()}
			</Form.Error>

			<Form.Button disabled={isLoadingFormSubmit} class="w-full">
				{#if isLoadingFormSubmit}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{$LL.forgotPasswordPage.form.submit()}
			</Form.Button>
		</form>

		<div class="text-center">
			<Button href="/auth/login" variant="link">
				{$LL.forgotPasswordPage.form.alreadyHaveAccount()}
			</Button>
			<Button href="/auth/register" variant="link">
				{$LL.forgotPasswordPage.form.dontHaveAccount()}
			</Button>
		</div>
	</div>

	<SuccessMessage
		bind:open={isSuccessful}
		title={$LL.forgotPasswordPage.successfulPasswordResetSent.title()}
		description={$LL.forgotPasswordPage.successfulPasswordResetSent.description()}
	/>
</div>
