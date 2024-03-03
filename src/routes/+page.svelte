<script lang="ts">
	import type { Video } from '$lib/types/video.type';
	import Section from '$lib/components/section/Section.svelte';
	import VideoEntry from '$lib/components/section/VideoEntry.svelte';
	import Empty from '$lib/components/section/Empty.svelte';

	export let data;

	const dayInMilliseconds = 24 * 60 * 60 * 1000;
	const now = Date.now();

	const latest: Array<Video> = data.videos.filter((video: Video) => {
		return Date.parse(video.published) > now - dayInMilliseconds;
	});

	const earlierThisWeek: Array<Video> = data.videos.filter((video: Video) => {
		return (
			now - dayInMilliseconds > Date.parse(video.published) &&
			Date.parse(video.published) > now - dayInMilliseconds * 7
		);
	});
</script>

<main>
	{#if latest.length == 0 && earlierThisWeek.length == 0}
		<Empty />
	{:else}
		{#each new Map( [['Past 24 hours', latest], ['Past 7 days', earlierThisWeek]] ).entries() as [title, values]}
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
