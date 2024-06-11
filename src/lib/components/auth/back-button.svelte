<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';

	export let label: string;
	export let href: string;
</script>

<Button {href} variant="link" size="sm" class={cn('w-full font-normal', $$restProps.class)}>
	{label}
</Button>
