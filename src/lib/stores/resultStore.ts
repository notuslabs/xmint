import { writable } from 'svelte/store';

export const result = writable<{
	mint: number | null;
	redeem: number | null;
}>({
	mint: null,
	redeem: null
});
