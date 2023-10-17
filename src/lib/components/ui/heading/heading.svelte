<script lang="ts">
	import { cn } from '$lib/utils';
	import { headingVariants, type Props } from '.';

	type $$Props = Props;

	let className: $$Props['class'] = undefined;
	export let size: $$Props['size'] = 'default';
	export { className as class };
</script>

<h1 class={cn(headingVariants({ size, className }))} {...$$restProps}>
	<slot />
</h1>
