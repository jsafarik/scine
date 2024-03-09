import {
	openConnection,
	initFirebaseConfig,
	closeConnection
} from '../src/lib/firebase/firebase.js';

export async function open() {
	initFirebaseConfig(
		process.env.API_KEY,
		process.env.AUTH_DOMAIN,
		process.env.PROJECT_ID,
		process.env.STORAGE_BUCKET,
		process.env.MESSAGING_SENDER_ID,
		process.env.APP_ID,
		process.env.MEASUREMENT_ID,
		process.env.FIRESTORE_USERNAME,
		process.env.FIRESTORE_PASSWORD
	);

	await openConnection();
}

export function close() {
	closeConnection();
}
