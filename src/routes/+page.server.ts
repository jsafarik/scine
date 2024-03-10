import {
	initFirebaseConfig,
	openConnection,
	closeConnection,
	getVideos
} from '$lib/firebase/firebase';
import type { Video } from '$lib/types/video.type';
import { env } from '$env/dynamic/private';

export async function load(): Promise<{ videos: Array<Video> }> {
	initFirebaseConfig(
		env.API_KEY,
		env.AUTH_DOMAIN,
		env.PROJECT_ID,
		env.STORAGE_BUCKET,
		env.MESSAGING_SENDER_ID,
		env.APP_ID,
		env.MEASUREMENT_ID,
		env.FIRESTORE_USERNAME,
		env.FIRESTORE_PASSWORD
	);
	await openConnection();
	const videos = await getVideos();
	closeConnection();
	return { videos };
}
