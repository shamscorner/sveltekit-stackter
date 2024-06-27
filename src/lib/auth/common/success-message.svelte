<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { LL } from '$lib/i18n/i18n-svelte';

	const dispatch = createEventDispatcher();

	export let open = false;
	export let title: string;
	export let description: string;

	function close() {
		dispatch('close');
		open = false;
	}
</script>

<Sheet.Root bind:open closeOnOutsideClick={false}>
	<Sheet.Content side="top">
		<div class="mx-auto mt-10 max-w-2xl text-center">
			<Sheet.Header>
				<Sheet.Title class="text-center">
					{@html title}
				</Sheet.Title>
				{#if description}
					<Sheet.Description class="text-center">
						{@html description}
					</Sheet.Description>
				{/if}
			</Sheet.Header>
			<Sheet.Footer class="mx-auto mt-16 max-w-lg sm:justify-center">
				<Sheet.Close asChild let:builder>
					<Button builders={[builder]} type="button" on:click={close}>
						{$LL.common.close()}
					</Button>
				</Sheet.Close>
			</Sheet.Footer>
		</div>
	</Sheet.Content>
</Sheet.Root>
