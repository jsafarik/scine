import { parseStringPromise } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors.js';
import { open, close } from './firebase.js';
import { addChannel } from '../src/lib/firebase/firebase.js';
import { createInterface } from 'node:readline/promises';

if (process.argv.length < 3) {
	console.log('You need to provide a handle of a youtube channel (withouth the "@"!).');
	console.log('The command should look like: npm run register-channel -- <channel-handle>');
	process.exit(1);
}

let channelHandle = process.argv[2];
let prompt = process.argv[3] !== '-y';

const channelHtml = await (await fetch(`https://www.youtube.com/@${channelHandle}`)).text();
const matcher = /https:\/\/www\.youtube\.com\/feeds\/videos.xml\?channel_id=([a-zA-Z0-9\-_]+)/.exec(
	channelHtml
);

const rssUrl = matcher[0];
const channelId = matcher[1];

let rssContent = await (await fetch(rssUrl)).text();
let rss = await parseStringPromise(rssContent, { tagNameProcessors: [stripPrefix] });
let channelName = rss.feed.title[0]

console.table({
	'Channel Name': channelName,
	'Channel Handle': `@${channelHandle}`,
	'Channel ID': channelId,
	'RSS URL': rssUrl
});

async function shouldRegister() {
	const readline = createInterface({
		input: process.stdin,
		output: process.stdout
	});
	const answer = await readline.question(`Register channel? [y|n] `);
	readline.close();
	return answer == 'y';
}

if (!prompt || (await shouldRegister())) {
	open();
	await addChannel({ name: channelName, handle: channelHandle, rss: rssUrl, id: channelId });
	close();
} else {
	console.log('Skipping channel registration');
}
