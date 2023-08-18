<script lang="ts">
	import WalletIcon from '$lib/components/icons/WalletIcon.svelte';
	import '../app.postcss';
	import { page } from '$app/stores';

	const links = [
		{ name: 'Dashboard', href: '/dashboard' },
		{ name: 'Exchange', href: '/exchange' },
		{ name: 'Liquidity', href: '/liquidity' }
	];

	function checkIfCurrentRoute(route: string) {
		return route === $page.url.pathname;
	}
</script>

<nav class="gap-2 container mx-auto flex justify-between items-center h-navbar mt-8 px-6">
	<a href="/">
		<img src="/logo.svg" alt="XMint logo" />
	</a>

	<div class="flex items-center justify-center gap-10 px-10">
		{#each links as link}
			{@const isCurrentRoute = checkIfCurrentRoute(link.href)}
			<a href={link.href} class={isCurrentRoute ? 'text-snow font-bold' : 'text-snow-dark '}
				>{link.name}</a
			>
		{/each}
	</div>

	<div>
		<button
			class="group flex gap-2 items-center justify-center h-10 px-4 py-2 rounded-lg border border-mint bg-transparent text-snow hover:bg-mint-transparent active:bg-mint transition-colors"
		>
			<WalletIcon width={24} height={24} class="group-active:fill-snow transition-colors" />
			Connect Wallet
		</button>
	</div>
</nav>
<slot />
