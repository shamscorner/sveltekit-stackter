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

	export let data: SuperValidated<Infer<FormSchema>>;

	let isLoadingFormSubmit = false;
	let isLoadingGoogleAuth = false;
	let errorResponse: ErrorResponseType | null = null;

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
		// const lastLoginEmail = getLastLoginEmail();

		// if (lastLoginEmail) {
		// 	$form.email = lastLoginEmail;
		// 	rememberEmail = true;
		// }

		if (navigator) {
			analytics = await getSiteAnalytics();
		}
	});
</script>

<div class="space-y-8">
	<Heading class="mx-auto text-center">
		{$LL.loginPage.title()}
	</Heading>
	<div class="grid min-w-[19rem] max-w-md gap-6">
		<form method="POST" use:enhance class="space-y-5">
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

			{#if errorResponse && errorResponse.message}
				<Form.Error>
					{errorResponse?.message || $LL.errors.somethingWentWrong()}
				</Form.Error>
			{/if}

			<Form.Button disabled={isLoadingFormSubmit} class="mt-5 w-full">
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
