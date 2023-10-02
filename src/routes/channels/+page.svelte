<script lang="ts">
	import channels from '$lib/channels.json';
	import Link from '$lib/components/base/Link.svelte';
</script>

<ul>
	{#each channels as channel}
		<li><Link href="https://youtube.com/@{channel.name}" newTab>@{channel.name}</Link></li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		text-align: center;

		li {
			padding: 15px 0;
		}
	}
</style>
