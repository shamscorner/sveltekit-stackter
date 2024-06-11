<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import { Button } from '$lib/components/ui/button';

	export let mode: 'modal' | 'redirect' = 'redirect';
	// export let asChild = false;

	function onLoginClicked() {
		console.log('Modal login clicked');
	}
</script>

{#if mode === 'modal'}
	<Button size="lg" on:click={onLoginClicked}>
		<slot />
	</Button>
{:else}
	<Button size="lg" href="/auth/login">
		<slot />
	</Button>
{/if}
