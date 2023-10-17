<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_GOOGLE_TAG_MEASUREMENT_ID } from '$env/static/public';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// import { partytownSnippet } from '@builder.io/partytown/integration';

	$: {
		if (typeof gtag !== 'undefined') {
			// TODO: fix the typing not loading for gtag issue
			// eslint-disable-next-line no-undef
			gtag('config', PUBLIC_GOOGLE_TAG_MEASUREMENT_ID, {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<!-- <script>
		partytown = {
			forward: ['dataLayer.push']
		};
	</script> -->

	<!-- {@html `<script> ${partytownSnippet()} </script>`} -->

	{@html `<script async src="https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GOOGLE_TAG_MEASUREMENT_ID}">
	</script>`}

	{@html `<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', '${PUBLIC_GOOGLE_TAG_MEASUREMENT_ID}');
	</script>`}

	<!-- TODO: add facebook pixel code here -->
</svelte:head>
