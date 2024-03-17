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
	Timestamp
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

async function getVideos(): Promise<Array<Video>> {
	return (await getDocs(collection(firebaseDb, 'videos'))).docs.map((doc) => {
		let video = doc.data() as FirestoreVideo;
		return Video.fromFirestoreVideo(video);
	});
}

async function getChannels(): Promise<Array<Channel>> {
	return (await getDocs(collection(firebaseDb, 'channels'))).docs.map(
		(doc) => doc.data() as Channel
	);
}

async function addVideo(video: Video): Promise<void> {
	await setDoc(doc(firebaseDb, 'videos', video.id), video);
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
	getChannels,
	addVideo,
	addChannel
};
