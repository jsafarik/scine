import {
	initFirebaseConfig,
	openConnection,
	closeConnection,
	getVideosPublishedAfter
} from '$lib/firebase/firebase';
import type { Video } from '$lib/firebase/video';
import { env } from '$env/dynamic/private';

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
	const videos = (await getVideosPublishedAfter(Date.now() - 7 * 24 * 60 * 60 * 1000))
		.sort((a, b) => {
			return b.published - a.published;
		})
		.map((video) => video.toSimpleObject());
	closeConnection();
	return { videos };
}
