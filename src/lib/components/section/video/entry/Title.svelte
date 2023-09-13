<script lang="ts">
	export let title: string;
</script>

<div>{title}</div>

<style lang="scss">
	div {
		overflow: hidden;
		width: 93%;
		line-height: 1.2em;
		height: 2.4em;
		margin: 8px auto;
		position: relative;

		&:before {
			content: '';
			width: 100%;
			height: 2.4em;
			position: absolute;
			left: 0;
			top: 0;
			background: linear-gradient(transparent 1.2em, #111);
			pointer-events: none;
		}
	}
</style>
