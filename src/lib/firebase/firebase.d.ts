let firebaseConfig;
let firebaseApp;
let firebaseDb;

function openConnection(): void;
function initFirebaseConfig(
	apiKey: string,
	authDomain: string,
	projectId: string,
	storageBucket: string,
	messagingSenderId: string,
	appId: string,
	measurementId: string
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
