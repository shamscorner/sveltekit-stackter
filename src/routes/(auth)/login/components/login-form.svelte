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
	import { getEmptyErrorResponse, type ErrorResponseType } from '$lib/services/error.service';
	import type { AnalyticsDto } from '$lib/types';
	import { PUBLIC_LANDING_PAGE } from '$env/static/public';
	import { onMount } from 'svelte';
	import { getSiteAnalytics } from '$lib/helpers/analytics';
	import { deleteLastLoginEmail, getLastLoginEmail, saveLastLoginEmail } from '../helpers';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import ContinueWithOptions from '../../components/continue-with-options.svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	let isLoadingFormSubmit = false;
	let isLoadingGoogleAuth = false;
	let errorResponse: ErrorResponseType | null = null;
	let rememberEmail = false;

	let analytics: AnalyticsDto = {
		browserHash: '',
		landingPage: PUBLIC_LANDING_PAGE,
		isIncognitoMode: false,
		referralSiteUrl: undefined
	};

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onSubmit: () => {
			errorResponse = null;
			isLoadingFormSubmit = true;
		},
		onError: () => {
			isLoadingFormSubmit = false;
			errorResponse = getEmptyErrorResponse($LL.errors.somethingWentWrong());
		},
		onResult: async ({ result }) => {
			if (result.type !== 'success' || !result.data) {
				isLoadingFormSubmit = false;
				return;
			}

			const formData = result.data.form;
			if (!formData.valid) {
				isLoadingFormSubmit = false;
				return;
			}

			performRememberMe();

			console.log('Form data:', formData);

			// TODO: do something after the form submission

			isLoadingFormSubmit = false;
		}
	});

	const { form: formData, enhance } = form;

	$: {
		formData.update((d) => ({
			...d,
			browserHash: analytics.browserHash,
			isIncognitoMode: analytics.isIncognitoMode
		}));
	}

	onMount(async () => {
		const lastLoginEmail = getLastLoginEmail();

		if (lastLoginEmail) {
			$formData.email = lastLoginEmail;
			rememberEmail = true;
		}

		if (navigator) {
			analytics = await getSiteAnalytics();
		}
	});

	function performRememberMe() {
		if (rememberEmail) {
			saveLastLoginEmail($formData.email);
			return;
		}
		deleteLastLoginEmail();
	}
</script>

<div>
	<Heading class="mx-auto text-center">
		{$LL.loginPage.title()}
	</Heading>
	<div class="mt-4 grid min-w-[19rem] max-w-md gap-6">
		<form method="POST" use:enhance class="space-y-4">
			<input type="hidden" name="browserHash" bind:value={$formData.browserHash} />
			<input type="hidden" name="isIncognitoMode" bind:value={$formData.isIncognitoMode} />

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>{$LL.loginPage.form.email()}</Form.Label>
					<Input {...attrs} bind:value={$formData.email} placeholder="john@example.com" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>{$LL.loginPage.form.password()}</Form.Label>
					<Input
						{...attrs}
						type="password"
						placeholder="********"
						bind:value={$formData.password}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex items-center space-x-4">
				<Switch id="remember-me" bind:checked={rememberEmail} />
				<Label for="remember-me">{$LL.loginPage.form.rememberMe()}</Label>
			</div>

			<Form.Error show={!!(errorResponse && errorResponse.message)}>
				{errorResponse?.message || $LL.errors.somethingWentWrong()}
			</Form.Error>

			<Form.Button disabled={isLoadingFormSubmit} class="w-full">
				{#if isLoadingFormSubmit}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{$LL.loginPage.form.submit()}
			</Form.Button>
		</form>

		<ContinueWithOptions {isLoadingGoogleAuth} {isLoadingFormSubmit} />

		<div class="text-center">
			<Button href="/register" variant="link">
				{$LL.loginPage.form.dontHaveAccount()}
			</Button>
			<Button href="/forgot-password" variant="link">
				{$LL.loginPage.form.forgotPassword()}
			</Button>
		</div>
	</div>
</div>
