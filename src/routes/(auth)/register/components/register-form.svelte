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
	import ContinueWithOptions from '../../components/continue-with-options.svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	let isLoadingFormSubmit = false;
	let isLoadingGoogleAuth = false;
	let errorResponse = '';

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
			errorResponse = '';
			isLoadingFormSubmit = true;
		},
		onResult: async ({ result }) => {
			if (result.type === 'failure') {
				errorResponse = result.data ? result.data.error : '';
				isLoadingFormSubmit = false;
				return;
			}

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
		if (navigator) {
			analytics = await getSiteAnalytics();
		}
	});
</script>

<div>
	<Heading class="mx-auto text-center">
		{$LL.registerPage.title()}
	</Heading>
	<div class="mt-4 grid min-w-[19rem] max-w-md gap-6">
		<form method="POST" use:enhance class="space-y-4">
			<input type="hidden" name="browserHash" bind:value={$formData.browserHash} />
			<input type="hidden" name="userAgent" bind:value={$formData.userAgent} />

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

			<Form.Error show={!!errorResponse}>
				{errorResponse || $LL.errors.somethingWentWrong()}
			</Form.Error>

			<Form.Button disabled={isLoadingFormSubmit} class="w-full">
				{#if isLoadingFormSubmit}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{$LL.registerPage.form.submit()}
			</Form.Button>
		</form>

		<ContinueWithOptions {isLoadingGoogleAuth} {isLoadingFormSubmit} />

		<div class="text-center">
			<Button href="/login" variant="link">
				{$LL.registerPage.form.alreadyHaveAccount()}
			</Button>
		</div>
	</div>
</div>
