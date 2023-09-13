<script lang="ts">
	import VideoSection from '$lib/components/section/VideoSection.svelte';

	export let name: string;
</script>

<section>
	<span>{name}</span>
	<hr />
	<VideoSection>
		<slot />
	</VideoSection>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-flow: column;

		span {
			text-align: right;
			user-select: none;
		}

		hr {
			border: 0px;
			border-top: 2px solid rgba($color: #333, $alpha: 0.3);
			margin: 10px 0 18px 0;
		}
	}
</style>
