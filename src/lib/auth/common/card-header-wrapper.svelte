<script lang="ts">
	import { Heading } from '$lib/components/ui/heading';

	export let label: string;
</script>

<div class="flex w-full flex-col items-center justify-center gap-y-2">
	<Heading element="h1">🔐 Auth</Heading>
	<p class="text-sm text-muted-foreground">
		{label}
	</p>
</div>
