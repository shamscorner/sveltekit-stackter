<script lang="ts">
	import { onMount } from 'svelte';

	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { PUBLIC_LANDING_PAGE } from '$env/static/public';
	import { Icons } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { Heading } from '$lib/components/ui/heading';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { getSiteAnalytics } from '$lib/helpers/analytics';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { type ErrorResponseType, getEmptyErrorResponse } from '$lib/services/error.service';
	import type { AnalyticsDto } from '$lib/types';

	import { deleteLastLoginEmail, getLastLoginEmail, saveLastLoginEmail } from '../helpers';
	import { type FormSchema, formSchema } from '../schema';

	export let data: SuperValidated<Infer<FormSchema>>;

	let isLoadingFormSubmit = false;
	let isLoadingGoogleAuth = false;
	let errorResponse: ErrorResponseType | null = null;
	let rememberEmail = false;

	let analytics: AnalyticsDto = {
		browserHash: '',
		landingPage: PUBLIC_LANDING_PAGE,
		isIncognitoMode: false,
		userAgent: '',
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
		$formData.browserHash = analytics.browserHash;
		$formData.userAgent = analytics.userAgent;
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
			<input type="hidden" name="userAgent" bind:value={$formData.userAgent} />

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>{$LL.loginPage.form.email()}</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
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

		<div class="relative mt-5">
			<div class="absolute inset-0 flex items-center">
				<span class="w-full border-t" />
			</div>
			<div class="relative flex justify-center text-xs uppercase">
				<span class="bg-background px-2 text-muted-foreground">
					{$LL.loginPage.form.continueWith()}
				</span>
			</div>
		</div>

		<Button
			variant="outline"
			type="button"
			disabled={isLoadingGoogleAuth || isLoadingFormSubmit}
			class="hover:bg-gray-50 hover:text-black"
		>
			{#if isLoadingGoogleAuth}
				<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				<Icons.google class="mr-2 h-4 w-4" />
			{/if}
			{' '}
			Google
		</Button>

		<div class="text-center">
			<Button href="/forgot-password" variant="link">
				{$LL.loginPage.form.forgotPassword()}
			</Button>
		</div>
	</div>
</div>
