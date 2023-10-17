import Root from './heading.svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import { tv, type VariantProps } from 'tailwind-variants';

const headingVariants = tv({
	base: 'max-w-lg font-extrabold',
	variants: {
		size: {
			default: 'text-xl md:text-3xl md:leading-[2.5rem]',
			xl: 'text-2xl md:text-4xl md:leading-[3rem]'
		}
	},
	defaultVariants: {
		size: 'default'
	}
});

type Size = VariantProps<typeof headingVariants>['size'];

type Props = {
	size?: Size;
	class?: HTMLInputAttributes['class'];
};

export {
	Root,
	type Props,
	//
	Root as Heading,
	type Props as HeadingProps,
	headingVariants
};
