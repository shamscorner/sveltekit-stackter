import type { Icon as LucideIcon } from 'lucide-svelte';
import {
	Loader2,
	Instagram,
	Link,
	X,
	ChevronsUpDown,
	LayoutDashboard,
	ScrollText,
	Users2,
	CircleDollarSign,
	Settings,
	Menu,
	ArrowRight
} from 'lucide-svelte';

import Google from './google.svelte';

export type Icon = LucideIcon;

export const Icons = {
	spinner: Loader2,
	google: Google,
	camera: Instagram,
	link: Link,
	close: X,
	select: ChevronsUpDown,
	dashboard: LayoutDashboard,
	documents: ScrollText,
	users: Users2,
	dollarCircle: CircleDollarSign,
	settings: Settings,
	menu: Menu,
	arrowRight: ArrowRight
};

export type IconType = any;
