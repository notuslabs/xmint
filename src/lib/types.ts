import type { SvelteComponent } from 'svelte';

export type DropdownItem = {
	label: string;
	icon: typeof SvelteComponent;
	comingSoon: boolean;
};
