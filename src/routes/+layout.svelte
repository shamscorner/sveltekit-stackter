<script lang="ts">
	import { onMount } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';

	import { page } from '$app/stores';
	import Analytics from '$lib/components/common/Analytics.svelte';
	import AppBackground from '$lib/components/common/AppBackground.svelte';
	import {
		getFromLocalStorageWithExpiry,
		saveToLocalStorageWithExpiry
	} from '$lib/helpers/localstorage';
	import { setLocale } from '$lib/i18n/i18n-svelte';
	import type { FpType } from '$lib/types';

	import Footer from './components/footer/Footer.svelte';
	import Navbar from './components/navbar/Navbar.svelte';
	import type { LayoutData } from './$types';

	import '../app.postcss';

	export let data: LayoutData;

	setLocale(data.locale);

	onMount(() => {
		saveReferralCode();
		saveFirstPageVisit();
	});

	function saveReferralCode() {
		const referralCodeFromUrl = $page.url.searchParams.get('rc');
		if (!referralCodeFromUrl) return;

		const getFirst20Characters = (inputString: string) =>
			inputString.length <= 20 ? inputString : inputString.substring(0, 20);

		saveToLocalStorageWithExpiry('rc', getFirst20Characters(referralCodeFromUrl), 30);
	}

	function saveFirstPageVisit() {
		const existingFirstPage = localStorage.getItem('fp');
		if (existingFirstPage) return;

		const fpObj: FpType = {
			landing: document.location.pathname,
			referrer: document.referrer,
			referrerUrl: document.URL,
			ua: navigator.userAgent,
			rc: getFromLocalStorageWithExpiry('rc') || ''
		};

		localStorage.setItem('fp', JSON.stringify(fpObj));
	}
</script>

<ModeWatcher />

<Analytics />

<AppBackground />

<div class="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
	<Navbar />

	<slot />

	<Footer />
</div>
