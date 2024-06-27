import { tv, type VariantProps } from 'tailwind-variants';

import Root from './heading.svelte';

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
	element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export {
	//
	Root as Heading,
	type Props as HeadingProps,
	headingVariants,
	type Props,
	Root
};
