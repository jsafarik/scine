<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
</script>

<header>
	{#if $page.url.pathname == '/'}
		<h1>{title}</h1>
	{:else}
		<h1><a href="/">{title}</a></h1>
	{/if}
</header>

<style lang="scss">
	header {
		user-select: none;
		margin: 20px auto;
		text-align: center;

		h1 {
			margin: 0;

			a,
			a:visited,
			a:active,
			a:hover {
				color: #eee;
				text-decoration: none;
			}
		}
	}
</style>
