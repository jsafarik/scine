import { parseStringPromise } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors.js';
import { addVideo, getChannels } from '../src/lib/firebase/firebase.js';
import { open, close } from './firebase.js';
import { Timestamp } from 'firebase/firestore';

const daysToUpdate = 3;

await open();
let channels = await getChannels();

for (const channel of channels) {
	let rssContent = await (await fetch(channel.rss)).text();
	let rss = await parseStringPromise(rssContent, { tagNameProcessors: [stripPrefix] });

	let videos = rss.feed.entry.filter((video) => {
		return Date.parse(video.published) > Date.now() - daysToUpdate * 24 * 60 * 60 * 1000;
	});

	for (const entry of videos) {
		const video = {
			channelName: rss.feed.title[0],
			published: Timestamp.fromMillis(Date.parse(entry.published[0])),
			thumbnailUrl: entry.group[0].thumbnail[0].$.url,
			title: entry.title[0],
			id: entry.id[0].replace('yt:video:', '')
		};
		console.table(video);
		await addVideo(video);
	}
}

close();
