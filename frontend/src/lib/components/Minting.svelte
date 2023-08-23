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
	import { onMount, type SvelteComponent } from 'svelte';
	import { result } from '$lib/stores/resultStore';
	import { slide } from 'svelte/transition';

	import {
		BrowserProvider,
		JsonRpcProvider,
		Contract,
		ZeroAddress,
		MaxUint256,
		ethers
	} from 'ethers';
	import onboard from '$lib/web3-onboard';

	import OilMintABI from '$lib/OilMint.json';
	import XusdtABI from '$lib/XUSDT.json';

	import { OilMintContract, XUSDTContract, rpcURL } from '$lib/constants';

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
			label: 'xUSDT',
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

	onMount(() => {
		let mintingElement = document.getElementById('minting');
		let minting = mintingElement?.getBoundingClientRect().right;

		let root = document.documentElement;
		root.style.setProperty(
			'--account-center-position-right',
			window.screen.width - (minting ?? 0) - 16 + 'px'
		);
	});

	const wallets$ = onboard.state.select('wallets');
	$: connectedAccount = $wallets$?.[0]?.accounts?.[0];

	const approve = async () => {
		const sendProvider = new BrowserProvider($wallets$?.[0]?.provider);
		const signer = await sendProvider.getSigner();
		try {
			const contractSend = new Contract(XUSDTContract, XusdtABI, signer);

			const tx = await contractSend.approve(OilMintContract, MaxUint256);
			console.log(tx);
			alert('Approved');
		} catch (error) {
			console.log(error);
		}
	};

	let balance = 0;

	const balanceOf = async (connectedAccount: any) => {
		const readProvider = new JsonRpcProvider(rpcURL);
		const contractRead = new Contract(XUSDTContract, XusdtABI, readProvider);

		try {
			if (connectedAccount.address) {
				const tx = await contractRead.balanceOf(connectedAccount.address);
				balance = Number(tx) / 10 ** 6;
			}
			return 0;
		} catch (error) {
			console.log(error);
		}
	};
	$: balanceOf(connectedAccount);

	let isApproved: boolean;

	const allowance = async (connectedAccount: any, amount: any) => {
		const readProvider = new JsonRpcProvider(rpcURL);
		const contractRead = new Contract(XUSDTContract, XusdtABI, readProvider);

		try {
			const tx = await contractRead.allowance(connectedAccount.address, OilMintContract);
			isApproved = Number(tx) / 10 ** 6 > ((amount || 0) / 0.0125) * 2;
		} catch (error) {
			console.log(error);
		}
	};

	$: allowance(connectedAccount, $result.mint);

	$: console.log((($result.mint || 0) / 0.0125) * 2 * 10 ** 6);
	$: console.log(((($result.redeem || 0) * 0.0125) / 2) * 10 ** 18);

	const deposit = async () => {
		const sendProvider = new BrowserProvider($wallets$?.[0]?.provider);
		const signer = await sendProvider.getSigner();

		try {
			const contractSend = new Contract(OilMintContract, OilMintABI, signer);
			const tx = await contractSend.deposit((($result.mint || 0) / 0.0125) * 2 * 10 ** 6);

			return tx;
		} catch (error) {
			console.log(error);
		}
	};

	const withdraw = async () => {
		const sendProvider = new BrowserProvider($wallets$?.[0]?.provider);
		const signer = await sendProvider.getSigner();

		try {
			const contractSend = new Contract(OilMintContract, OilMintABI, signer);
			const tx = await contractSend.withdraw(((($result.redeem || 0) * 0.0125) / 2) * 10 ** 6);

			return tx;
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div
	id="minting"
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
				'flex-1 border-transparent font-bold py-[11.5px] px-6 flex justify-center items-center rounded-lg border z-[0]'
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
				'flex-1 border-transparent font-bold py-[11.5px] px-6 flex justify-center items-center rounded-lg border z-[0]'
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
					1 USDT = 0.0125 xOIL - Oracle Price ($80.00)
				{:else}
					1 xOIL = 80.00 USDT - Oracle Price ($80.00)
				{/if}
			</p>

			<div class="flex flex-col" transition:slide>
				<div class="flex justify-between items-start">
					<p class="text-snow-darker">Collateral Ratio</p>
					<p class="text-snow-darker">200%</p>
				</div>
				<div class="flex justify-between items-start">
					<p class="text-snow-darker">Spread Fee</p>
					<p class="text-snow-darker">0%</p>
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
		{#if $currentTab === 'mint'}
			{#if isApproved}
				<button
					class="font-bold bg-mint rounded-lg px-2.5 py-[11.5px] h-10 flex justify-center items-center hover:bg-mint-dark transition-colors active:bg-mint-darker"
					on:click={deposit}
				>
					Mint
				</button>
			{:else}
				<button
					class="font-bold bg-mint rounded-lg px-2.5 py-[11.5px] h-10 flex justify-center items-center hover:bg-mint-dark transition-colors active:bg-mint-darker"
					on:click={approve}
				>
					Approve
				</button>
			{/if}
		{:else}
			<button
				class="font-bold bg-mint rounded-lg px-2.5 py-[11.5px] h-10 flex justify-center items-center hover:bg-mint-dark transition-colors active:bg-mint-darker"
				on:click={withdraw}
			>
				Redeem
			</button>
		{/if}
	</div>
</div>
