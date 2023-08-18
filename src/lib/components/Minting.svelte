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
	import { result } from '$lib/stores/resultStore';
	import { slide } from 'svelte/transition';
	import Light1 from './icons/Light1.svelte';

	initTabsStore({
		defaultValue: 'mint'
	});
	const {
		elements: { root: tabRoot, list: tabList, trigger: tabTrigger },
		states: { value: currentTab }
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
	let hovering: null | 'mint' | 'redeem' = null;

	$: calculated = $currentTab === 'mint' ? $result.mint !== null : $result.redeem !== null;
</script>

<div
	class="rounded-lg w-full max-w-[386px] px-5 py-8 border border-border-gray flex flex-col gap-[34px] bg-dark-gray"
	use:melt={$tabRoot}
>
	<div
		class="relative w-full flex bg-dark-gray-700 rounded-lg border border-dark-gray-400 h-10"
		use:melt={$tabList}
	>
		<div
			class={cn(
				'absolute w-1/2 rounded-lg border border-mint bg-mint-transparent top-0 h-full transition ease-in-out-quart duration-300',
				$currentTab === 'redeem' && 'translate-x-full',
				$currentTab === 'mint' && 'translate-x-0',
				hovering === 'mint' && 'translate-x-0',
				hovering === 'redeem' && 'translate-x-full'
			)}
		/>
		<button
			class={cn(
				'flex-1 border-transparent font-bold py-[11.5px] px-6 flex justify-center items-center rounded-lg border z-[2]'
			)}
			on:mouseover={() => (hovering = 'mint')}
			on:focus={() => (hovering = 'mint')}
			on:blur={() => (hovering = null)}
			on:mouseleave={() => (hovering = null)}
			use:melt={$tabTrigger('mint')}
		>
			Mint
		</button>
		<button
			class={cn(
				'flex-1 border-transparent font-bold py-[11.5px] px-6 flex justify-center items-center rounded-lg border z-[2]'
			)}
			on:mouseover={() => (hovering = 'redeem')}
			on:focus={() => (hovering = 'redeem')}
			on:blur={() => (hovering = null)}
			on:mouseleave={() => (hovering = null)}
			use:melt={$tabTrigger('redeem')}
		>
			Redeem
		</button>
	</div>
	<div class={cn('flex flex-col gap-8', calculated && 'gap-6')}>
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

		{#if calculated}
			<p
				class="font-bold border-b border-b-border-gray py-2 leading-[normal] text-snow-darker"
				transition:slide
			>
				{#if $currentTab === 'mint'}
					1 USDT = 0.012 xOIL ($83.33)
				{:else}
					0.012 xOIL ($83.33) = 1 USDT
				{/if}
			</p>

			<div class="flex flex-col" transition:slide>
				<div class="flex justify-between items-start">
					<p class="text-snow-darker">Collateral Ratio</p>
					<p class="text-snow-darker">300%</p>
				</div>
				<div class="flex justify-between items-start">
					<p class="text-snow-darker">Spread Fee</p>
					<p class="text-snow-darker">0.2%</p>
				</div>
				<div class="flex justify-between items-start">
					<p class="text-snow-darker">Output</p>
					<p class="text-snow-darker">
						{#if $currentTab === 'mint'}
							{$result.mint}
						{:else}
							{$result.redeem}
						{/if}
					</p>
				</div>
			</div>
		{/if}

		<button
			class="font-bold bg-mint rounded-lg px-2.5 py-[11.5px] h-10 flex justify-center items-center hover:bg-mint-dark transition-colors active:bg-mint-darker"
		>
			Approve
		</button>
	</div>
</div>
