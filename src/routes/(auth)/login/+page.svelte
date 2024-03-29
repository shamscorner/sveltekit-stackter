<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import Seo from '$lib/components/common/SEO.svelte';
	import { Heading } from '$lib/components/ui/heading';
	import { Button } from '$lib/components/ui/button';
	import { Icons } from '$lib/components/icons';
	import * as Form from '$lib/components/ui/form';
	import { formSchema } from './schema';
	import type { PageData } from './$types';
	import type { FormOptions } from 'formsnap';
	import { getEmptyErrorResponse, type ErrorResponseType } from '$lib/services/error.service';

	export let data: PageData;

	let isLoadingFormSubmit = false;
	let isLoadingGoogleAuth = false;
	let errorResponse: ErrorResponseType | null = null;

	const formOptions: FormOptions<typeof formSchema> = {
		validators: formSchema,
		onSubmit: () => {
			errorResponse = null;
			isLoadingFormSubmit = true;
		},
		onError: () => {
			isLoadingFormSubmit = false;
			errorResponse = getEmptyErrorResponse($LL.errors.somethingWentWrong());
		},
		onResult: async ({ result }) => {
			if (result.type !== 'success') {
				isLoadingFormSubmit = false;
				return;
			}

			const formData = result.data.form;
			if (!formData.valid) {
				isLoadingFormSubmit = false;
				return;
			}

			// TODO: do something after the form submission

			isLoadingFormSubmit = false;
		}
	};
</script>

<Seo
	title={$LL.loginPage.title()}
	description={$LL.loginPage.description()}
	keywords={$LL.loginPage.keywords()}
/>

<main class="relative min-h-screen p-5 py-6 sm:px-8">
	<div class="mx-auto my-12 grid max-w-5xl place-items-center">
		<div class="space-y-8">
			<Heading class="mx-auto text-center">
				{$LL.loginPage.title()}
			</Heading>
			<div class="grid min-w-[19rem] max-w-md gap-6">
				<Form.Root
					method="POST"
					options={formOptions}
					form={data.form}
					schema={formSchema}
					let:config
					class="space-y-5"
				>
					<Form.Field {config} name="email">
						<Form.Item>
							<Form.Label>{$LL.loginPage.form.email()}</Form.Label>
							<Form.Input type="email" placeholder="john@example.com" />
							<Form.Validation />
						</Form.Item>
					</Form.Field>
					<Form.Field {config} name="password">
						<Form.Item>
							<Form.Label>{$LL.loginPage.form.password()}</Form.Label>
							<Form.Input type="password" placeholder="********" />
							<Form.Validation />
						</Form.Item>
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
				</Form.Root>
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
	</div>
</main>
