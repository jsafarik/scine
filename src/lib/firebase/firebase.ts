import {
	initializeApp,
	getApps,
	deleteApp,
	type FirebaseOptions,
	type FirebaseApp
} from 'firebase/app';
import {
	getFirestore,
	getDocs,
	collection,
	setDoc,
	doc,
	Firestore,
	getDoc,
	query,
	where,
	Timestamp,
	orderBy,
	limit
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, type Auth } from 'firebase/auth';
import { type FirestoreVideo, Video } from './video';
import type { Channel } from './channel';

let firebaseConfig: FirebaseOptions;
let firestoreConfig: { username: string; password: string };
let firebaseApp: FirebaseApp;
let firebaseDb: Firestore;
let firebaseAuth: Auth;

async function openConnection(): Promise<void> {
	if (!getApps().length) {
		firebaseApp = initializeApp(firebaseConfig);
	} else {
		firebaseApp = getApps()[0];
	}

	firebaseDb = getFirestore(firebaseApp);
	firebaseAuth = getAuth(firebaseApp);
	await signInWithEmailAndPassword(
		firebaseAuth,
		firestoreConfig.username,
		firestoreConfig.password
	);
}

function initFirebaseConfig(
	apiKey: string,
	authDomain: string,
	projectId: string,
	storageBucket: string,
	messagingSenderId: string,
	appId: string,
	measurementId: string,
	firestoreUsername: string,
	firestorePassword: string
): void {
	firebaseConfig = {
		apiKey: apiKey,
		authDomain: authDomain,
		projectId: projectId,
		storageBucket: storageBucket,
		messagingSenderId: messagingSenderId,
		appId: appId,
		measurementId: measurementId
	};

	firestoreConfig = {
		username: firestoreUsername,
		password: firestorePassword
	};
}

function getVideoQuery(ageThreshold?: number | undefined, count?: number | undefined) {
	let videosRef = collection(firebaseDb, 'videos');

	let q = query(videosRef, orderBy('published', 'desc'));

	if (ageThreshold != undefined) {
		q = query(q, where('published', '>=', Timestamp.fromMillis(ageThreshold)));
	}

	if (count != undefined) {
		q = query(q, limit(count));
	}

	return q;
}

async function getVideos(ageThreshold?: number | undefined): Promise<Array<Video>> {
	let query = getVideoQuery(ageThreshold);

	return (await getDocs(query)).docs.map((doc) => {
		let video = doc.data() as FirestoreVideo;
		return Video.fromFirestoreVideo(video);
	});
}

async function countVideos(ageThreshold?: number | undefined): Promise<number> {
	let query = getVideoQuery(ageThreshold);

	return (await getDocs(query)).size;
}

async function getLatestVideos(count: number): Promise<Array<Video>> {
	let query = getVideoQuery(undefined, count);

	return (await getDocs(query)).docs.map((doc) => {
		let video = doc.data() as FirestoreVideo;
		return Video.fromFirestoreVideo(video);
	});
}

async function getChannels(): Promise<Array<Channel>> {
	return (await getDocs(collection(firebaseDb, 'channels'))).docs.map(
		(doc) => doc.data() as Channel
	);
}

async function getChannel(id: string): Promise<Channel> {
	return (await getDoc(doc(firebaseDb, 'channels', id))).data() as Channel;
}

/**
 * Add or update a video in database.
 * In case the video already exists and the content is identical, skip the update.
 * @param video video to be added
 * @returns true if content was updated, false otherwise
 */
async function addVideo(video: Video): Promise<boolean> {
	let current = await getDoc(doc(firebaseDb, 'videos', video.id));
	if (current.exists() && video.matchesFirestoreVideo(current.data() as FirestoreVideo)) {
		return false;
	}
	await setDoc(doc(firebaseDb, 'videos', video.id), video.toFirestoreVideo());
	return true;
}

async function addChannel(channel: Channel): Promise<void> {
	await setDoc(doc(firebaseDb, 'channels', channel.id), channel);
}

function closeConnection(): void {
	deleteApp(firebaseApp);
}

export {
	initFirebaseConfig,
	openConnection,
	closeConnection,
	getVideos,
	countVideos,
	getLatestVideos,
	getChannel,
	getChannels,
	addVideo,
	addChannel
};
