<script lang="ts">
	import { getTabsStore } from '$lib/stores/tabsStore';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import ChevronDown from './icons/ChevronDown.svelte';
	import { fly } from 'svelte/transition';
	import ArrowCircleDown from './icons/ArrowCircleDown.svelte';
	import type { SvelteComponent } from 'svelte';

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
		elements: { content }
	} = getTabsStore();
</script>

<div use:melt={$content('mint')} class="flex flex-col gap-8 relative">
	<div class="flex flex-col gap-2">
		<label for="collateral" class="font-bold">Collateral</label>
		<div
			class="relative border border-border-gray px-4 py-2 rounded-lg flex justify-between items-start h-full"
		>
			<div class="flex flex-col gap-4 h-[79.5px] justify-between min-w-[142px] max-w-full">
				<button
					use:melt={$firstMenuTrigger}
					class="w-max flex justify-center items-center gap-2 bg-dark-gray-900 rounded-lg border border-border-gray-darker px-2 py-1.5 text-sm"
					transition:fly={{ duration: 150 }}
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
				<span class="text-sm text-dark-gray-500 font-bold leading-[normal]">Balance:</span>
			</div>
			<div class="flex justify-end items-center h-[79.5px]">
				<input
					type="number"
					name="collateral"
					id="collateral"
					value={0}
					class="text-2xl bg-transparent text-right w-full inline-block break-all max-w-full"
				/>
			</div>
		</div>
	</div>
	<div class="flex justify-center items-center absolute top-1/2 -translate-1/2 left-1/2">
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
					transition:fly={{ duration: 150 }}
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
					value={0}
					class="text-2xl bg-transparent text-right w-full inline-block break-all max-w-full"
				/>
			</div>
		</div>
	</div>
</div>
