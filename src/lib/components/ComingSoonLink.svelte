<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	export let href: string;
	export let label: string;

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

	function handleLinkClick(e: MouseEvent) {
		e.preventDefault();
	}

	function checkIfCurrentRoute(route: string) {
		return route === $page.url.pathname;
	}
</script>

<a
	{href}
	class={cn(
		'text-snow-dark opacity-50 cursor-default',
		checkIfCurrentRoute('/exchange') && 'text-snow font-bold'
	)}
	on:click={(e) => {
		handleLinkClick(e);
	}}
	use:melt={$trigger}
>
	{label}
</a>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 rounded-md bg-dark-gray shadow-sm"
	>
		<div use:melt={$arrow} />
		<p class="px-4 py-1 text-dark-snow-darker opacity-50">Coming soon...</p>
	</div>
{/if}
