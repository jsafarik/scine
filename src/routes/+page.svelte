<script lang="ts">
	import Section from '$lib/components/section/Section.svelte';
	import VideoEntry from '$lib/components/section/VideoEntry.svelte';
	import Empty from '$lib/components/section/Empty.svelte';

	export let data;

	const dayInMilliseconds = 24 * 60 * 60 * 1000;
	const now = Date.now();

	const earlier = data.videos.map(video => video)
	const latest = earlier.splice(0, earlier.findLastIndex(video => video.published > now - dayInMilliseconds))
</script>

<main>
	{#if latest.length == 0 && earlier.length == 0}
		<Empty />
	{:else}
		{#each new Map( [['Past 24 hours', latest], ['Recently', earlier]] ).entries() as [title, values]}
			{#if values.length != 0}
				<Section name={title}>
					{#each values as video}
						<VideoEntry
							thumbnailUrl={video.thumbnailUrl}
							title={video.title}
							videoId={video.id}
							channelName={video.channelName}
						/>
					{/each}
				</Section>
			{/if}
		{/each}
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-flow: column;
		width: 80%;
		margin: 0 auto;
	}
</style>
