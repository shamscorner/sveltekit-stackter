<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema, type ResendEmailFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Icons } from '$lib/components/icons';
	import type { AnalyticsDto } from '$lib/types';
	import { PUBLIC_LANDING_PAGE } from '$env/static/public';
	import { onMount } from 'svelte';
	import { getSiteAnalytics } from '$lib/helpers/analytics';
	import { performFormValidation } from '$lib/services/error.service';
	import SuccessMessage from './success-message.svelte';
	import { REGISTER_EMAIL_KEY } from '$lib/components/auth/constants';
	import CardWrapper from '../card-wrapper.svelte';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let resendEmailData: SuperValidated<Infer<ResendEmailFormSchema>>;

	let isLoadingFormSubmit = false;
	let errorResponse = '';

	let analytics: AnalyticsDto = {
		browserHash: '',
		landingPage: PUBLIC_LANDING_PAGE,
		isIncognitoMode: false,
		referralSiteUrl: null
	};

	let isSuccessfulRegistration = false;

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
				isSuccessfulRegistration = true;

				const resultFormData = result.data.form.data;
				saveUserEmail(resultFormData.email);
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

	function saveUserEmail(email) {
		localStorage.setItem(REGISTER_EMAIL_KEY, email);
	}
</script>

<CardWrapper
	headerLabel={$LL.registerPage.title()}
	backButtonLabel={$LL.registerPage.form.alreadyHaveAccount()}
	backButtonHref="/auth/login"
	showSocial
>
	<div class="grid gap-6">
		<form method="POST" action="?/register" use:enhance class="space-y-4">
			<input type="hidden" name="browserHash" bind:value={$formData.browserHash} />
			<input type="hidden" name="landingPage" bind:value={$formData.landingPage} />
			<input type="hidden" name="referralSiteUrl" bind:value={$formData.referralSiteUrl} />
			<input type="hidden" name="isIncognitoMode" bind:value={$formData.isIncognitoMode} />

			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>{$LL.registerPage.form.name()}</Form.Label>
					<Input {...attrs} bind:value={$formData.name} placeholder="John Doe" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>{$LL.registerPage.form.email()}</Form.Label>
					<Input {...attrs} bind:value={$formData.email} placeholder="john@example.com" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>{$LL.registerPage.form.password()}</Form.Label>
					<Input
						{...attrs}
						type="password"
						placeholder="********"
						bind:value={$formData.password}
					/>
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
				{$LL.registerPage.form.submit()}
			</Form.Button>
		</form>
	</div>

	<SuccessMessage bind:open={isSuccessfulRegistration} data={resendEmailData} />
</CardWrapper>
