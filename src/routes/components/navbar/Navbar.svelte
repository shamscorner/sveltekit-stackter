<script lang="ts">
	import ThemeToggle from '$lib/components/common/ThemeToggle.svelte';
	import { Icons } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';
</script>

<header class="sticky top-0 z-40 mx-auto w-full bg-background shadow-lg">
	<div class="mx-auto flex max-w-5xl items-center justify-center px-4 py-3">
		<Button href="/" variant="outline" size="icon">
			<Icons.home class="h-4 w-4" />
		</Button>

		<Button
			href="https://github.com/shamscorner/sveltekit-stackter"
			target="_blank"
			variant="outline"
			size="icon"
			class="ml-auto mr-3"
		>
			<Icons.github class="h-4 w-4" />
		</Button>

		<ThemeToggle />
	</div>
</header>
