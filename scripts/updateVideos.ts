import { parseStringPromise } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors.js';
import { addVideo, getChannel, getChannels } from '../src/lib/firebase/firebase';
import { open, close } from './firebase';
import { Video } from '../src/lib/firebase/video';
import { writeFileSync } from 'node:fs';

const daysToUpdate = parseInt(process.argv[2]);

await open();
let channels = process.argv[3] ? [await getChannel(process.argv[3])] : await getChannels();

let shouldDeploy = false;

for (const channel of channels) {
	let rssContent = await (await fetch(channel.rss)).text();
	let rss = await parseStringPromise(rssContent, { tagNameProcessors: [stripPrefix] });

	let videos = rss.feed.entry.filter((video: any) => {
		return Date.parse(video.published) > Date.now() - daysToUpdate * 24 * 60 * 60 * 1000;
	});

	for (const entry of videos) {
		let videoId = entry.id[0].replace('yt:video:', '');

		// hacky way to test whether a video is actually a short or not
		let shortResponse = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
			redirect: 'manual',
			headers: { 'User-Agent': '' }
		});

		// a regular video returns 303 (redirects to /watch?v=$videoId)
		// shorts return 200
		if (shortResponse.status == 200) {
			continue;
		}
		const video = new Video(
			Date.parse(entry.published[0]),
			entry.title[0],
			videoId,
			entry.group[0].thumbnail[0].$.url,
			rss.feed.title[0]
		);
		console.table(video);
		shouldDeploy ||= await addVideo(video);
	}
}

if (shouldDeploy) {
	writeFileSync('.deploy', '');
	console.log('Updated videos, deploy should be triggered');
}

close();
