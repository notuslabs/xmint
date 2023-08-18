<script lang="ts">
	import { cn } from '$lib/utils';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import Xeur from './icons/XEUR.svelte';
	import Xiron from './icons/XIRON.svelte';
	import Xaapl from './icons/XAAPL.svelte';
	import Xtsla from './icons/XTSLA.svelte';
	import Xoil from './icons/XOIL.svelte';
	import Usdt from './icons/USDT.svelte';
	import Xdc from './icons/XDC.svelte';
	import { getTabsStore, initTabsStore } from '$lib/stores/tabsStore';
	import Mint from './Mint.svelte';
	import Redeem from './Redeem.svelte';
	import type { DropdownItem } from '$lib/types';
	import type { SvelteComponent } from 'svelte';

	initTabsStore('mint');
	const {
		elements: { root, list, trigger }
	} = getTabsStore();

	const {
		elements: { menu: firstMenu, item: firstMenuItem, trigger: firstMenuTrigger }
	} = createDropdownMenu();

	const {
		elements: { menu: secondMenu, item: secondMenuItem, trigger: secondMenuTrigger }
	} = createDropdownMenu();

	const mintingBaseOptions: DropdownItem[] = [
		{
			label: 'USDT',
			icon: Usdt as unknown as typeof SvelteComponent,
			comingSoon: false
		},
		{
			label: 'XDC',
			icon: Xdc as unknown as typeof SvelteComponent,
			comingSoon: true
		}
	];

	const mintingResultOptions: DropdownItem[] = [
		{
			label: 'xOIL',
			icon: Xoil as unknown as typeof SvelteComponent,
			comingSoon: false
		},
		{
			label: 'xTSLA',
			icon: Xtsla as unknown as typeof SvelteComponent,
			comingSoon: true
		},
		{
			label: 'xAAPL',
			icon: Xaapl as unknown as typeof SvelteComponent,
			comingSoon: true
		},
		{
			label: 'xIRON',
			icon: Xiron as unknown as typeof SvelteComponent,
			comingSoon: true
		},
		{
			label: 'xEUR',
			icon: Xeur as unknown as typeof SvelteComponent,
			comingSoon: true
		}
	];

	let selectedBaseMint = mintingBaseOptions[0];
	let selectedResultMint = mintingResultOptions[0];
</script>

<div
	class="rounded-lg w-full max-w-[386px] px-5 py-8 border border-border-gray flex flex-col gap-[34px] bg-dark-gray"
	use:melt={$root}
>
	<div
		class="w-full flex bg-dark-gray-700 rounded-lg border border-dark-gray-400 h-10"
		use:melt={$list}
	>
		<button
			class={cn(
				'flex-1 border-transparent font-bold py-[11.5px] px-6 flex justify-center items-center data-[state="active"]:bg-mint-transparent rounded-lg data-[state="active"]:border-mint border'
			)}
			use:melt={$trigger('mint')}
		>
			Mint
		</button>
		<button
			class={cn(
				'flex-1 border-transparent font-bold py-[11.5px] px-6 flex justify-center items-center data-[state="active"]:bg-mint-transparent rounded-lg data-[state="active"]:border-mint border'
			)}
			use:melt={$trigger('redeem')}
		>
			Redeem
		</button>
	</div>
	<Mint
		{firstMenu}
		{firstMenuItem}
		{firstMenuTrigger}
		{secondMenu}
		{secondMenuItem}
		{secondMenuTrigger}
		{mintingBaseOptions}
		{mintingResultOptions}
		{selectedBaseMint}
		{selectedResultMint}
	/>
	<Redeem
		{firstMenu}
		{firstMenuItem}
		{firstMenuTrigger}
		{secondMenu}
		{secondMenuItem}
		{secondMenuTrigger}
		{mintingBaseOptions}
		{mintingResultOptions}
		{selectedBaseMint}
		{selectedResultMint}
	/>

	<button
		class="font-bold bg-mint rounded-lg px-2.5 py-[11.5px] h-10 flex justify-center items-center hover:bg-mint-dark transition-colors active:bg-mint-darker"
	>
		Approve
	</button>
</div>
