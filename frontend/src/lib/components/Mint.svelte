<script lang="ts">
	import { getTabsStore } from '$lib/stores/tabsStore';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import ChevronDown from './icons/ChevronDown.svelte';
	import ArrowCircleDown from './icons/ArrowCircleDown.svelte';
	import type { SvelteComponent } from 'svelte';
	import { result } from '$lib/stores/resultStore';

	import { BrowserProvider, JsonRpcProvider, Contract, ZeroAddress } from 'ethers';
	import onboard from '$lib/web3-onboard';

	import OilMintABI from '$lib/OilMint.json';
	import XusdtABI from '$lib/XUSDT.json';

	import { OilMintContract, XUSDTContract, rpcURL } from '$lib/constants';

	export let mintingBaseOptions: {
		label: string;
		icon: typeof SvelteComponent;
		comingSoon: boolean;
	}[];

	export let mintingResultOptions: {
		label: string;
		icon: typeof SvelteComponent;
		comingSoon: boolean;
	}[];

	export let selectedBaseMint: {
		label: string;
		icon: typeof SvelteComponent;
		comingSoon: boolean;
	};

	export let selectedResultMint: {
		label: string;
		icon: typeof SvelteComponent;
		comingSoon: boolean;
	};

	export let firstMenu: ReturnType<typeof createDropdownMenu>['elements']['menu'];
	export let firstMenuItem: ReturnType<typeof createDropdownMenu>['elements']['item'];
	export let firstMenuTrigger: ReturnType<typeof createDropdownMenu>['elements']['trigger'];

	export let secondMenu: ReturnType<typeof createDropdownMenu>['elements']['menu'];
	export let secondMenuItem: ReturnType<typeof createDropdownMenu>['elements']['item'];
	export let secondMenuTrigger: ReturnType<typeof createDropdownMenu>['elements']['trigger'];

	const {
		elements: { content: tabContent },
		states: { value: currentTab }
	} = getTabsStore();

	let collateralValue: number | null = null;
	let mintedValue: number | null = null;

	function onCollateralValueChange(amount: number | null) {
		if (amount === null) {
			mintedValue = null;
			return;
		}
		if (amount === 0) {
			mintedValue = 0;
			return;
		}

		mintedValue = (amount * 0.0125) / 2;
	}

	function onMintedValueChange(amount: number | null) {
		if (amount === null) {
			collateralValue = null;
			return;
		}
		if (amount === 0) {
			collateralValue = 0;
			return;
		}
		collateralValue = Number((amount / 0.0125 / 2).toPrecision(21));
	}

	$: $result.mint = collateralValue === 0 ? null : mintedValue;

	const wallets$ = onboard.state.select('wallets');
	$: connectedAccount = $wallets$?.[0]?.accounts?.[0];

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
</script>

<div use:melt={$tabContent('mint')} class="flex flex-col gap-8 relative">
	{#if $currentTab === 'mint'}
		<div class="flex flex-col gap-2">
			<label for="collateral" class="font-bold">Collateral</label>
			<div
				class="relative border border-border-gray px-4 py-2 rounded-lg flex justify-between items-start h-full"
			>
				<div class="flex flex-col gap-4 h-[79.5px] justify-between min-w-[142px] max-w-full">
					<button
						use:melt={$firstMenuTrigger}
						class="w-max flex justify-center items-center gap-2 bg-dark-gray-900 rounded-lg border border-border-gray-darker px-2 py-1.5 text-sm"
					>
						<svelte:component this={selectedBaseMint.icon} class="rounded-full" />
						{selectedBaseMint.label}
						<ChevronDown />
					</button>
					<div
						class="bg-dark-gray-900 border border-border-gray-darker rounded-lg flex flex-col"
						use:melt={$firstMenu}
					>
						{#each mintingBaseOptions.slice(1) as baseMint}
							<button
								class="hover:bg-dark-gray-700 rounded-lg px-2 py-2 flex gap-2 items-center justify-center disabled:opacity-50"
								disabled={baseMint.comingSoon}
								use:melt={$firstMenuItem}
							>
								<svelte:component this={baseMint.icon} />
								<div class="flex flex-col justify-center items-start">
									<span class="text-sm">
										{baseMint.label}
									</span>
									{#if baseMint.comingSoon}
										<span class="text-muted text-[8px]">Coming soon...</span>
									{/if}
								</div>
							</button>
						{/each}
					</div>
					<!-- Dropdown Component -->
					<span class="text-sm text-dark-gray-500 font-bold leading-[normal]"
						>Balance: {balance}</span
					>
				</div>
				<div class="flex justify-end items-center h-[79.5px]">
					<input
						type="number"
						name="collateral"
						id="collateral"
						class="text-2xl bg-transparent text-right w-full inline-block break-all max-w-full focus:outline-none"
						placeholder="0"
						bind:value={collateralValue}
						on:input={() => onCollateralValueChange(collateralValue)}
					/>
				</div>
			</div>
		</div>
		<div
			class="flex justify-center items-center absolute top-1/2 -translate-x-1/2 translate-y-[10%] left-1/2"
		>
			<ArrowCircleDown />
		</div>
		<div class="flex flex-col gap-2">
			<label for="minted" class="font-bold">Minted</label>
			<div
				class="relative border border-border-gray px-4 py-2 rounded-lg flex justify-between items-start h-full"
			>
				<div class="flex flex-col justify-between gap-4 min-w-[142px] h-[79.5px] max-w-full">
					<button
						use:melt={$secondMenuTrigger}
						class="w-max flex justify-center items-center gap-2 bg-dark-gray-900 rounded-lg border border-border-gray-darker px-2 py-1.5 text-sm"
					>
						<svelte:component this={selectedResultMint.icon} class="rounded-full" />
						{selectedResultMint.label}
						<ChevronDown />
					</button>
					<div
						class="bg-dark-gray-900 border border-border-gray-darker rounded-lg flex flex-col"
						use:melt={$secondMenu}
					>
						{#each mintingResultOptions.slice(1) as resultMint}
							<button
								class="hover:bg-dark-gray-700 rounded-lg px-2 py-2 flex gap-2 items-center justify-center disabled:opacity-50"
								disabled={resultMint.comingSoon}
								use:melt={$secondMenuItem}
							>
								<svelte:component this={resultMint.icon} />
								<div class="flex flex-col justify-center items-start">
									<span class="text-sm">
										{resultMint.label}
									</span>
									{#if resultMint.comingSoon}
										<span class="text-muted text-[8px]">Coming soon...</span>
									{/if}
								</div>
							</button>
						{/each}
					</div>
					<!-- Dropdown Component -->
					<span class="text-sm text-dark-gray-500 font-bold leading-[normal]">Balance:</span>
				</div>
				<div class="flex justify-end items-center h-[79.5px]">
					<input
						type="number"
						name="minted"
						id="minted"
						class="text-2xl bg-transparent text-right w-full inline-block break-all max-w-full focus:outline-none"
						placeholder="0"
						bind:value={mintedValue}
						on:input={() => onMintedValueChange(mintedValue)}
					/>
				</div>
			</div>
		</div>
	{/if}
</div>
