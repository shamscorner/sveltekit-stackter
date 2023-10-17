<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLParagraphElement>;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p
	class={cn('mx-auto max-w-xs text-center text-sm text-destructive', className)}
	{...$$restProps}
>
	<slot />
</p>
