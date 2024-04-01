<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { goto } from '$app/navigation';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient, type Infer } from 'sveltekit-superforms/adapters';
	import { resendEmailFormSchema, type ResendEmailFormSchema } from '../schema';
	import { performFormValidation } from '$lib/services/error.service';
	import { Icons } from '$lib/components/icons';
	import { FormButton } from '$lib/components/ui/form';
	import { userEmail } from '../store';

	export let data: SuperValidated<Infer<ResendEmailFormSchema>>;
	export let open = false;

	let isLoadingFormSubmit = false;

	const form = superForm(data, {
		validators: zodClient(resendEmailFormSchema),
		resetForm: false,
		onSubmit: () => {
			isLoadingFormSubmit = true;
		},
		onResult: async ({ result }) => {
			const errorMessage = performFormValidation(result);
			if (errorMessage) {
				// TODO: show a toast message error
				console.log('error', errorMessage);
				isLoadingFormSubmit = false;
				return;
			}

			if (result.type === 'success' && result.data) {
				// TODO: show a toast message success
				console.log('success', result.data);
			}

			isLoadingFormSubmit = false;
		}
	});

	const { form: formData, enhance } = form;

	$: $formData.email = $userEmail;

	function navigateToLogin() {
		goto('/login');
	}
</script>

<Sheet.Root bind:open>
	<Sheet.Content side="top">
		<div class="mx-auto mt-10 max-w-2xl text-center">
			<Sheet.Header>
				<Sheet.Title class="text-center">
					{$LL.registerPage.successfulRegistration.title()}
				</Sheet.Title>
				<Sheet.Description class="text-center">
					{$LL.registerPage.successfulRegistration.description()}
				</Sheet.Description>
			</Sheet.Header>
			<p class="mx-auto my-8 max-w-md">
				{$LL.registerPage.successfulRegistration.haveNotGetEmail()}
			</p>
			<Sheet.Footer class="mx-auto mt-16 max-w-lg">
				<form method="POST" action="?/resendEmail" use:enhance class="mr-auto">
					<input type="hidden" name="email" bind:value={$formData.email} />
					<FormButton disabled={isLoadingFormSubmit} variant="secondary" class="w-full">
						{#if isLoadingFormSubmit}
							<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						{$LL.registerPage.successfulRegistration.resendEmail()}
					</FormButton>
				</form>

				<Sheet.Close asChild let:builder>
					<Button builders={[builder]} type="button" on:click={navigateToLogin}>
						{$LL.loginPage.form.submit()}
					</Button>
				</Sheet.Close>
			</Sheet.Footer>
		</div>
	</Sheet.Content>
</Sheet.Root>
