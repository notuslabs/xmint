<script lang="ts">
	import WalletIcon from '$lib/components/icons/WalletIcon.svelte';
	import '../app.postcss';
	import { page } from '$app/stores';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import ComingSoonLink from '$lib/components/ComingSoonLink.svelte';
	import ConnectWallet from '$lib/components/ConnectWallet.svelte';

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
		<ConnectWallet />
	</div>
</nav>
<slot />
