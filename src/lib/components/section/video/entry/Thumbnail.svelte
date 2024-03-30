<script lang="ts">
	export let thumbnailUrl: string;
	export let title: string;
	export let channelName: string;
	export let videoId: string;
</script>

<a
	href="https://www.youtube.com/watch?v={videoId}"
	target="_blank"
>
	<img src={thumbnailUrl} alt="{title} thumbnail" />
	<span>{channelName}</span>
</a>

<style lang="scss">
	a {
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		user-select: none;

		span {
			position: absolute;
			left: 10px;
			bottom: 10px;
			font-size: 7pt;
			font-weight: 800;
			color: #eee;
			background-color: rgba($color: black, $alpha: 0.5);
			padding: 5px 10px;
			border-radius: 100px;
			z-index: 1;
		}

		img {
			width: 100%;
		}
	}
</style>
