<script lang="ts">
	import { cn } from '$lib/utils';
	import { Picker } from 'emoji-mart';
	import emojiData from '@emoji-mart/data';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { Icons } from '$lib/components/icons';
	import Button from '../button/button.svelte';

	export let theme: 'light' | 'dark' | 'auto' = 'light';
	export let selectedEmoji = {
		native: '🍵'
	};

	const dispatch = createEventDispatcher();

	let picker: Picker;
	let pickerElem;

	let openPopover = false;

	onMount(() => {
		picker = new Picker({
			data: emojiData,
			theme,
			onEmojiSelect: (props) => {
				selectedEmoji = props;
				dispatch('selected', props);
				openPopover = false;
			}
		});
	});

	let className: string | undefined | null = undefined;
	export { className as class };

	async function onOpenChange(isOpen) {
		await tick();

		if (isOpen) {
			pickerElem.appendChild(picker);
		} else {
			pickerElem.removeChild(picker);
		}
	}
</script>

<Popover.Root bind:open={openPopover} {onOpenChange}>
	<Popover.Trigger type="button">
		<slot name="trigger">
			<Button
				type="button"
				variant="outline"
				class="hover:bg-gray-50 hover:text-primary"
			>
				{#if selectedEmoji}
					<span class="mr-2 text-xl"> {selectedEmoji.native}</span>
				{/if}
				<Icons.select class="ml-4 h-4 w-4" />
			</Button>
		</slot>
	</Popover.Trigger>
	<Popover.Content class="w-96 border-0 bg-transparent p-0 pt-1 shadow-none">
		<div bind:this={pickerElem} class={cn('max-w-md', className)}></div>
	</Popover.Content>
</Popover.Root>
