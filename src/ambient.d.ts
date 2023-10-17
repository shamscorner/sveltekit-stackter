// Squelch warnings of image imports from your assets dir
declare module '$lib/assets/*' {
	let meta;
	export default meta;
}
