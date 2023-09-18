import { parseStringPromise } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors.js';
import { readFile } from 'fs/promises';

let channelsUrl = 'https://raw.githubusercontent.com/jsafarik/scine/db/channels.json';

let response;

if (process.argv.length > 2) {
	response = await readFile(process.argv[2], 'ascii');
} else {
	response = await (await fetch(channelsUrl)).text();
}

let channels = JSON.parse(response);

let videos = [];

for (const channel of channels) {
	let rssContent = await (await fetch(channel.rss)).text();
	let rss = await parseStringPromise(rssContent, { tagNameProcessors: [stripPrefix] });

	rss.feed.entry.forEach((entry) => {
		videos.push({
			channelName: rss.feed.title[0],
			published: entry.published[0],
			thumbnailUrl: entry.group[0].thumbnail[0].$.url,
			title: entry.title[0],
			videoId: entry.id[0].replace('yt:video:', '')
		});
	});
}

videos = videos
	.filter((video) => {
		return Date.parse(video.published) > Date.now() - 7 * 24 * 60 * 60 * 1000;
	})
	.sort((a, b) => {
		return Date.parse(b.published) - Date.parse(a.published);
	});

console.log(JSON.stringify(videos));
