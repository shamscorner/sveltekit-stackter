<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Icons } from '$lib/components/icons';
	import { cn } from '$lib/utils';

	type $$Props = HTMLAttributes<HTMLParagraphElement> & {
		show?: boolean;
	};
	let show: $$Props['show'] = false;
	let className: string | undefined | null = undefined;
	export { className as class, show };
</script>

<p
	class={cn(
		'flex items-center gap-x-2 rounded-md bg-destructive/15 p-2 text-xs text-destructive',
		{ invisible: !show },
		className
	)}
	{...$$restProps}
>
	<Icons.triangleAlert class="h-4 w-4" />
	<slot />
</p>
