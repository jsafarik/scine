import { initializeApp, getApps, deleteApp } from 'firebase/app';
import { getFirestore, getDocs, collection, setDoc, doc } from 'firebase/firestore';


let firebaseConfig
let firebaseApp
let firebaseDb

function openConnection() {
	if (!getApps().length) {
		firebaseApp = initializeApp(firebaseConfig);
	} else {
		firebaseApp = getApps()[0];
	}

	firebaseDb = getFirestore(firebaseApp);
}

function initFirebaseConfig(apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId) {
	firebaseConfig = {
		apiKey: apiKey,
		authDomain: authDomain,
		projectId: projectId,
		storageBucket: storageBucket,
		messagingSenderId: messagingSenderId,
		appId: appId,
		measurementId: measurementId
	};
}

async function getVideos() {
	return (await getDocs(collection(firebaseDb, 'videos'))).docs.map((doc) => {
		let video = doc.data();
		video.published = video.published.toDate()
		return video;
	});
}

async function getChannels() {
	return (await getDocs(collection(firebaseDb, 'channels'))).docs.map((doc) => doc.data());
}

async function addVideo(video) {
	await setDoc(doc(firebaseDb, 'videos', video.id), video);
}

async function addChannel(channel) {
	await setDoc(doc(firebaseDb, 'channels', channel.id), channel);
}

function closeConnection() {
	deleteApp(firebaseApp);
}

export { initFirebaseConfig, openConnection, closeConnection, getVideos, getChannels, addVideo, addChannel };
