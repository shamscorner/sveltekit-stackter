<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { LL } from '$lib/i18n/i18n-svelte';

	export let open = false;
</script>

<Sheet.Root bind:open closeOnOutsideClick={false}>
	<Sheet.Content side="top">
		<div class="mx-auto mt-10 max-w-2xl text-center">
			<Sheet.Header>
				<Sheet.Title class="text-center">
					{$LL.forgotPasswordPage.successfulPasswordResetSent.title()}
				</Sheet.Title>
				<Sheet.Description class="text-center">
					{$LL.forgotPasswordPage.successfulPasswordResetSent.description()}
				</Sheet.Description>
			</Sheet.Header>
			<Sheet.Footer class="mx-auto mt-16 max-w-lg sm:justify-center">
				<Sheet.Close asChild let:builder>
					<Button builders={[builder]} type="button" on:click={() => (open = false)}>
						{$LL.common.close()}
					</Button>
				</Sheet.Close>
			</Sheet.Footer>
		</div>
	</Sheet.Content>
</Sheet.Root>
