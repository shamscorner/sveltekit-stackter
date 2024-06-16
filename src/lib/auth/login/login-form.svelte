<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Icons } from '$lib/components/icons';
	import { performFormValidation } from '$lib/services/error.service';
	import type { AnalyticsDto } from '$lib/types';
	import { PUBLIC_LANDING_PAGE } from '$env/static/public';
	import { onMount } from 'svelte';
	import { getSiteAnalytics } from '$lib/helpers/analytics';
	import { deleteLastLoginEmail, getLastLoginEmail, saveLastLoginEmail } from './utils';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import CardWrapper from '../common/card-wrapper.svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	let isLoadingFormSubmit = false;
	let errorResponse = '';
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
				performRememberMe();
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

<CardWrapper
	headerLabel={$LL.loginPage.title()}
	backButtonLabel={$LL.loginPage.form.dontHaveAccount()}
	backButtonHref="/auth/register"
	showSocial
>
	<div class="grid gap-6">
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

			<Form.Message show={!!errorResponse} type="error">
				{errorResponse || $LL.errors.somethingWentWrong()}
			</Form.Message>

			<Form.Button disabled={isLoadingFormSubmit} class="w-full">
				{#if isLoadingFormSubmit}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{$LL.loginPage.form.submit()}
			</Form.Button>
		</form>
	</div>
</CardWrapper>
