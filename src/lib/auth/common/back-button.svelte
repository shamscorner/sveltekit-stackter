<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	export let label: string;
	export let href: string;
</script>

<Button {href} variant="link" size="sm" class={cn('w-full font-normal', $$restProps.class)}>
	{label}
</Button>
