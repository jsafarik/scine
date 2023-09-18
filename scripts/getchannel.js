if (process.argv.length < 3) {
	console.log('You need to provide a username of a youtube channel (withouth the "@"!).');
	console.log('The command should look like: npm run get-url -- <channel-name>');
	process.exit(1);
}

let channelName;
let raw = false;

if (process.argv.length > 3) {
	// If more than 1 argument was supplied, check whether raw output should be provided
	if (process.argv.includes('-r')) {
		channelName = process.argv[2] == '-r' ? process.argv[3] : process.argv[2];
		raw = true;
	} else {
		console.log(
			"Too many arguments provided! The only arguments can be name of channel (without '@') and '-r' for raw output"
		);
		process.exit(1);
	}
} else {
	channelName = process.argv[2];
}

const channelHtml = await (await fetch(`https://www.youtube.com/@${channelName}`)).text();
const matcher = /https:\/\/www\.youtube\.com\/feeds\/videos.xml\?channel_id=([a-zA-Z0-9\-_]+)/.exec(
	channelHtml
);

const rssUrl = matcher[0];
const channelId = matcher[1];

if (raw) {
	console.log(JSON.stringify({ name: channelName, rss: rssUrl }));
} else {
	console.table({
		'Channel Name': `@${channelName}`,
		'Channel ID': channelId,
		'RSS URL': rssUrl
	});
}
