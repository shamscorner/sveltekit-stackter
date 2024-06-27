import type { Icon as LucideIcon } from 'lucide-svelte';
import {
	ArrowRight,
	ChevronsUpDown,
	CircleDollarSign,
	Github,
	Home,
	Instagram,
	LayoutDashboard,
	Link,
	Linkedin,
	Loader2,
	Menu,
	ScrollText,
	Settings,
	TriangleAlert,
	Twitter,
	Users2,
	X
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
	arrowRight: ArrowRight,
	twitter: Twitter,
	github: Github,
	linkedin: Linkedin,
	home: Home,
	triangleAlert: TriangleAlert
};

export type IconType = any;
