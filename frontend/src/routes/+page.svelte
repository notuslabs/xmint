<script lang="ts">
	import Minting from '$lib/components/Minting.svelte';
	import Light1 from '$lib/components/icons/Light1.svelte';
	import Light2 from '$lib/components/icons/Light2.svelte';
	import NotusLogo from '$lib/components/icons/NotusLogo.svelte';
</script>

<svelte:head>
	<title>xMint - Decentralized Synthetic Assets</title>
</svelte:head>
<div class="h-content flex flex-col gap-6">
	<main class="flex items-start justify-center px-6 container mx-auto">
		<Light1 class="fixed -top-[360px] -z-10 left-[40%]" />
		<Light2 class="fixed -top-52 lg:top-0 right-[30%] xl:right-[750px] -z-10" />
		<div
			class="flex justify-center items-center lg:justify-between lg:items-start flex-col lg:flex-row gap-20 md:gap-8 pt-0 lg:pt-24 w-full"
		>
			<div class="flex flex-col gap-6 max-w-[529px] w-full pt-28">
				<h1 class="text-6xl leading-[normal] text-center lg:text-left">
					Decentralized Synthetic Assets
				</h1>
				<p class="text-center lg:text-left">
					Trade stocks, commodities, etfs on the XinFin, this track the price of real world assets.
					Synthetic xMint are intended to be used as key building blocks in smart contracts. First
					step towards building a real DEX, hedging in the real world.
				</p>
			</div>
			<Minting />
		</div>
	</main>

	<footer
		class="w-full mt-auto justify-center items-center h-20 bg-transparent backdrop-blur-sm border-t border-t-gray-50/10"
	>
		<div class="container mx-auto px-6 flex justify-start items-center h-full gap-4">
			<a href="https://www.notuslabs.xyz/" target="_blank" rel="noopener noreferrer">
				<NotusLogo class="h-20 w-20" />
			</a>

			<div class="flex justify-center items-center gap-1">
				<span>
					Powered by <a
						href="https://www.notuslabs.xyz/"
						target="_blank"
						rel="noopener noreferrer"
						class="underline"
					>
						@notus
					</a>
				</span>
			</div>
		</div>
	</footer>
</div>
