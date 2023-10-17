<script lang="ts">
	import { getFormField } from 'formsnap';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { Input, type InputEvents } from '$lib/components/ui/input';
	import { Button } from '.';
	import { LL } from '$lib/i18n/i18n-svelte';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	const { attrStore, value } = getFormField();

	$: isPasswordInput = $$restProps.type === 'password';

	let isShowPassword = false;
</script>

<div class="relative w-full">
	{#if isShowPassword}
		<Input
			{...$attrStore}
			bind:value={$value}
			{...$$restProps}
			type="text"
			class={isPasswordInput ? 'pr-16' : ''}
			on:blur
			on:change
			on:click
			on:focus
			on:keydown
			on:keypress
			on:keyup
			on:mouseover
			on:mouseenter
			on:mouseleave
			on:paste
			on:input
		/>
	{:else}
		<Input
			{...$attrStore}
			bind:value={$value}
			{...$$restProps}
			class={isPasswordInput ? 'pr-16' : ''}
			on:blur
			on:change
			on:click
			on:focus
			on:keydown
			on:keypress
			on:keyup
			on:mouseover
			on:mouseenter
			on:mouseleave
			on:paste
			on:input
		/>
	{/if}
	{#if $$restProps.type === 'password' && $value}
		<Button
			type="button"
			variant="link"
			class="absolute right-0 top-0"
			on:click={() => (isShowPassword = !isShowPassword)}
		>
			{isShowPassword ? $LL.common.hide() : $LL.common.show()}
		</Button>
	{/if}
</div>
