<script lang="ts">
	import { Icons } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	import { githubAuthRoute, googleAuthRoute } from '../routes';
</script>

<div class={cn('flex w-full items-center gap-x-2', $$restProps.class)}>
	<Button href={googleAuthRoute} size="lg" variant="outline" class="w-full">
		<Icons.google class="h-5 w-5" />
	</Button>
	<Button href={githubAuthRoute} size="lg" variant="outline" class="w-full">
		<Icons.github class="h-5 w-5" />
	</Button>
</div>
