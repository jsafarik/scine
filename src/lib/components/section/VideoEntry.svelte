<script lang="ts">
	import Thumbnail from './video/entry/Thumbnail.svelte';
	import Title from './video/entry/Title.svelte';

	export let thumbnailUrl: string;
	export let title: string;
	export let channelName: string;
	export let videoId: string;
</script>

<div>
	<Thumbnail {thumbnailUrl} {title} {channelName} {videoId} />
	<Title {title} />
</div>
