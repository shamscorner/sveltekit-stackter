<script lang="ts">
	import { cn } from '$lib/utils';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { headingVariants, type Props } from '.';

	export let element: $$Props['element'] = 'h1';

	type $$Props = (
		| SvelteHTMLElements['h1']
		| SvelteHTMLElements['h2']
		| SvelteHTMLElements['h3']
		| SvelteHTMLElements['h4']
		| SvelteHTMLElements['h5']
		| SvelteHTMLElements['h6']
	) &
		Props;

	let className: $$Props['class'] = undefined;
	export let size: $$Props['size'] = 'default';
	export { className as class };
</script>

{#if element === 'h1'}
	<h1 class={cn(headingVariants({ size, className }))} {...$$restProps}>
		<slot />
	</h1>
{:else if element === 'h2'}
	<h2 class={cn(headingVariants({ size, className }))} {...$$restProps}>
		<slot />
	</h2>
{:else if element === 'h3'}
	<h3 class={cn(headingVariants({ size, className }))} {...$$restProps}>
		<slot />
	</h3>
{:else if element === 'h4'}
	<h4 class={cn(headingVariants({ size, className }))} {...$$restProps}>
		<slot />
	</h4>
{:else if element === 'h5'}
	<h5 class={cn(headingVariants({ size, className }))} {...$$restProps}>
		<slot />
	</h5>
{:else if element === 'h6'}
	<h6 class={cn(headingVariants({ size, className }))} {...$$restProps}>
		<slot />
	</h6>
{/if}
