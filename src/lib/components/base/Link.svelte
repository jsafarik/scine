<script lang="ts">
	export let href: string;
	export let newTab = false;
</script>

<a {href} target="{newTab ? '_blank' : '_self'}"><slot /></a>

<style lang="scss">
	a,
	a:visited,
	a:active {
		color: #999;
		text-decoration: none;
		transition: 0.1s ease-in-out;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	a:hover {
		color: #eee;
	}
</style>
