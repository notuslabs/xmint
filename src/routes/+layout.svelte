<script lang="ts">
	import WalletIcon from '$lib/components/icons/WalletIcon.svelte';
	import '../app.postcss';
	import { page } from '$app/stores';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import ComingSoonLink from '$lib/components/ComingSoonLink.svelte';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 500,
		closeOnPointerDown: false,
		forceVisible: true
	});

	function checkIfCurrentRoute(route: string) {
		return route === $page.url.pathname;
	}
</script>

<nav class="gap-2 container mx-auto flex justify-between items-center h-navbar mt-8 px-6">
	<a href="/">
		<img src="/logo.svg" alt="XMint logo" />
	</a>

	<div class="hidden md:flex items-center justify-center gap-10 px-10">
		<a
			href="/"
			class={checkIfCurrentRoute('/') ? 'text-snow font-bold' : 'text-snow-dark '}
			use:melt={$trigger}
		>
			Dashboard
		</a>
		<ComingSoonLink href="/exchange" label="Exchange" />
		<ComingSoonLink href="/liquidity" label="Liquidity" />
	</div>

	<div>
		<button
			class="group flex gap-2 items-center justify-center h-10 px-4 py-2 rounded-lg border border-mint bg-transparent text-snow hover:bg-mint-transparent active:bg-mint transition-colors whitespace-nowrap"
		>
			<WalletIcon width={24} height={24} class="group-active:fill-snow transition-colors" />
			Connect Wallet
		</button>
	</div>
</nav>
<slot />
