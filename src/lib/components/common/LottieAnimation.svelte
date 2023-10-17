<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import lottie, { type AnimationItem } from 'lottie-web';

	export let id: string;
	export let loop = true;
	export let autoplay = true;
	export let asset: any;

	let animation: AnimationItem | null = null;

	onMount(() => {
		const container = document.querySelector(`#${id}`);
		if (!container) return;

		animation = lottie.loadAnimation({
			container,
			animationData: asset,
			loop,
			autoplay
		});
	});

	onDestroy(() => {
		if (!animation) return;
		animation.destroy();
	});
</script>

<div {id} class={$$restProps.class} role="presentation" />
