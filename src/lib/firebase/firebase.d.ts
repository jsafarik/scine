let firebaseConfig;
let firebaseApp;
let firebaseDb;

async function openConnection(): Promise<void>;
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
): void;
async function getVideos(): Promise<Array<Video>>;
async function getChannels(): Promise<
	Array<{ name: string; handle: string; rss: string; id: string }>
>;
async function addVideo(video): Promise<void>;
async function addChannel(channel): Promise<void>;
function closeConnection(): void;

export {
	initFirebaseConfig,
	openConnection,
	closeConnection,
	getVideos,
	getChannels,
	addVideo,
	addChannel
};
