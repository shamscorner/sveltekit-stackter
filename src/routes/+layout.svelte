<script lang="ts">
	import { setLocale } from '$lib/i18n/i18n-svelte';
	import '../app.postcss';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		getFromLocalStorageWithExpiry,
		saveToLocalStorageWithExpiry
	} from '$lib/helpers/localstorage';
	import type { FpType } from '$lib/types';
	import Analytics from '$lib/components/common/Analytics.svelte';
	import Navbar from './components/navbar/Navbar.svelte';
	import Footer from './components/footer/Footer.svelte';
	import AppBackground from '$lib/components/common/AppBackground.svelte';
	import { ModeWatcher } from 'mode-watcher';

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

<Navbar />

<slot />

<Footer />
