<script lang="ts">
	import onboard from '$lib/web3-onboard';
	import WalletIcon from './icons/WalletIcon.svelte';

	// Subscribe to wallet updates
	const wallets$ = onboard.state.select('wallets');

	// The first wallet in the array of connected wallets
	$: connectedAccount = $wallets$?.[0]?.accounts?.[0];

	const connect = async () => {
		await onboard.connectWallet();
	};
</script>

{#if !connectedAccount}
	<div>
		<button
			class="group flex gap-2 items-center justify-center h-10 px-4 py-2 rounded-lg border border-mint bg-transparent text-snow hover:bg-mint-transparent active:bg-mint transition-colors whitespace-nowrap"
			on:click={connect}
		>
			<WalletIcon width={24} height={24} class="group-active:fill-snow transition-colors" />
			Connect Wallet
		</button>
	</div>
{/if}
