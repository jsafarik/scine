import {
	initFirebaseConfig,
	openConnection,
	closeConnection,
	getVideos,
	countVideos,
	getLatestVideos
} from '$lib/firebase/firebase';
import type { Video } from '$lib/firebase/video';
import { env } from '$env/dynamic/private';

async function getCurrentVideos(): Promise<Array<Video>> {
	let videos;

	const ageThreshold = Date.now() - 7 * 24 * 60 * 60 * 1000;
	let count = await countVideos(ageThreshold);
	if (count >= 5) {
		videos = await getVideos(ageThreshold);
	} else {
		videos = await getLatestVideos(5);
	}
	return videos.map((video) => video.toSimpleObject());
}

export async function load(): Promise<{ videos: Array<Video> }> {
	initFirebaseConfig(
		env.API_KEY!,
		env.AUTH_DOMAIN!,
		env.PROJECT_ID!,
		env.STORAGE_BUCKET!,
		env.MESSAGING_SENDER_ID!,
		env.APP_ID!,
		env.MEASUREMENT_ID!,
		env.FIRESTORE_USERNAME!,
		env.FIRESTORE_PASSWORD!
	);
	await openConnection();

	let videos = await getCurrentVideos();
	closeConnection();
	return { videos };
}
