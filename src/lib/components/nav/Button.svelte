<script lang="ts">
	export let open: boolean = false;
	export let onClick: () => void;
</script>

<span class="material-symbols-outlined" role="none" on:click={onClick}>
	{open ? 'close' : 'menu'}
</span>

<style lang="scss">
	span {
		position: fixed;
		top: 20px;
		right: 20px;
		color: #999;
		font-size: 2em;
		text-shadow: 0px 0px 10px #000000;
		z-index: 3;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		transition: 0.3s ease-in-out;

		&:hover {
			color: #eee;
		}
	}
</style>
