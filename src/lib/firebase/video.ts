import { Timestamp } from 'firebase/firestore';

export class Video {
	constructor(
		public published: number,
		public title: string,
		public id: string,
		public thumbnailUrl: string,
		public channelName: string
	) {}

	static fromFirestoreVideo(video: FirestoreVideo): Video {
		return new Video(
			video.published.toMillis(),
			video.title,
			video.id,
			video.thumbnailUrl,
			video.channelName
		);
	}

	toFirestoreVideo(): FirestoreVideo {
		return {
			published: Timestamp.fromMillis(this.published),
			title: this.title,
			id: this.id,
			thumbnailUrl: this.thumbnailUrl,
			channelName: this.channelName
		};
	}

	toSimpleObject() {
		return Object.assign({}, this);
	}

	matchesFirestoreVideo(video: FirestoreVideo): boolean {
		let fv = this.toFirestoreVideo();

		return (
			fv.published.isEqual(video.published) &&
			fv.title == video.title &&
			fv.id == video.id &&
			fv.thumbnailUrl == video.thumbnailUrl &&
			fv.channelName == video.channelName
		);
	}
}

export type FirestoreVideo = {
	published: Timestamp;
	title: string;
	id: string;
	thumbnailUrl: string;
	channelName: string;
};
