<script lang="ts">
	import { onMount } from 'svelte';

	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { PUBLIC_LANDING_PAGE } from '$env/static/public';
	import SuccessMessage from '$lib/auth/common/success-message.svelte';
	import { Icons } from '$lib/components/icons';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { getSiteAnalytics } from '$lib/helpers/analytics';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { performFormValidation } from '$lib/services/error.service';
	import type { AnalyticsDto } from '$lib/types';

	import CardWrapper from '../common/card-wrapper.svelte';

	import { type FormSchema, formSchema } from './schema';

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

<CardWrapper
	headerLabel={$LL.resetPasswordPage.title()}
	backButtonLabel={$LL.resetPasswordPage.form.alreadyHaveAccount()}
	backButtonHref="/auth/login"
>
	<div class="grid gap-6">
		<form method="POST" use:enhance class="space-y-4">
			<input type="hidden" name="browserHash" bind:value={$formData.browserHash} />
			<input type="hidden" name="landingPage" bind:value={$formData.landingPage} />
			<input type="hidden" name="referralSiteUrl" bind:value={$formData.referralSiteUrl} />
			<input type="hidden" name="isIncognitoMode" bind:value={$formData.isIncognitoMode} />

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>{$LL.resetPasswordPage.form.email()}</Form.Label>
					<Input {...attrs} bind:value={$formData.email} placeholder="john@example.com" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Message show={!!errorResponse} type="error">
				{errorResponse || $LL.errors.somethingWentWrong()}
			</Form.Message>

			<Form.Button disabled={isLoadingFormSubmit} class="w-full">
				{#if isLoadingFormSubmit}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{$LL.resetPasswordPage.form.submit()}
			</Form.Button>
		</form>
	</div>

	<SuccessMessage
		bind:open={isSuccessful}
		title={$LL.resetPasswordPage.successfulPasswordResetSent.title()}
		description={$LL.resetPasswordPage.successfulPasswordResetSent.description()}
	/>
</CardWrapper>
