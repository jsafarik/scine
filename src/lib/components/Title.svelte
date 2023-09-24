<script lang="ts">
	export let title: string;
</script>

<header>
	<h1>{title}</h1>
</header>

<style lang="scss">
	header {
		user-select: none;
		margin: 20px auto;
		text-align: center;

		h1 {
			margin: 0;
		}
	}
</style>
