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

	const disconnect = () => {
		onboard.disconnectWallet({ label: $wallets$?.[0]?.label });
	};

	const trunc = (address: string) =>
		address ? address.slice(0, 6) + '...' + address.slice(-6) : null;
</script>

{#if connectedAccount}
	<!-- <div class="wallet">
	<button
		class="group flex gap-2 items-center justify-center h-10 px-4 py-2 rounded-lg border border-mint bg-transparent text-snow hover:bg-mint-transparent active:bg-mint transition-colors whitespace-nowrap"
		on:click={disconnect}
	>
		<WalletIcon width={24} height={24} class="group-active:fill-snow transition-colors" />
		{trunc(connectedAccount.address)}
	</button>
	</div> -->
{:else}
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
