<script lang="ts">
	import Minting from '$lib/components/Minting.svelte';
</script>

<main class="h-content flex items-start justify-center container mx-auto px-6">
	<div class="flex justify-between items-start gap-8 pt-40 w-full">
		<div class="flex flex-col gap-6 max-w-[529px] w-full">
			<h1 class="text-7xl leading-[normal]">Lorem Ipsum is simply dummy</h1>
			<p class="">
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard dummy text ever since the 1500s.
			</p>
		</div>
		<Minting />
	</div>
</main>
