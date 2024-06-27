<script lang="ts">
	import { Icons } from '$lib/components/icons';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type MessageType = 'success' | 'error' | 'warning' | 'info';

	type $$Props = HTMLAttributes<HTMLParagraphElement> & {
		show?: boolean;
		type?: MessageType;
	};
	let show: $$Props['show'] = false;
	let type: MessageType = 'info';
	let className: string | undefined | null = undefined;
	export { className as class, show, type };
</script>

<p
	class={cn(
		'flex items-center gap-x-2 rounded-md p-2 text-xs',
		{
			'bg-green-600/15 text-green-600': type === 'success',
			'bg-destructive/15 text-destructive': type === 'error',
			'bg-amber-600/15 text-amber-600': type === 'warning',
			'bg-blue-600/15 text-blue-600': type === 'info'
		},
		{ hidden: !show },
		className
	)}
	{...$$restProps}
>
	<Icons.triangleAlert class="h-4 w-4" />
	<slot />
</p>
