<script lang="ts">
	import { Icons } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { cn } from '$lib/utils';

	export let isLoadingGoogleAuth = false;
	export let isLoadingFormSubmit = false;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn('space-y-4', className)}>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground">
				{$LL.registerPage.form.continueWith()}
			</span>
		</div>
	</div>

	<Button
		variant="outline"
		type="button"
		disabled={isLoadingGoogleAuth || isLoadingFormSubmit}
		class="w-full hover:bg-gray-50 hover:text-black"
	>
		{#if isLoadingGoogleAuth}
			<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
		{:else}
			<Icons.google class="mr-2 h-4 w-4" />
		{/if}
		{' '}
		Google
	</Button>
</div>
