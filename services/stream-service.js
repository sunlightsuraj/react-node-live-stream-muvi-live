const { db, writeDb } = require("../db/index");
const muviLib = require("../lib/muvi-lib")();

module.exports = () => {
	
	const getStreamContentList = () => {
		return db()?.contents ?? [];
	};

	const getStreamList = () => {
		return db()?.streams ?? [];
	}

	const createStreamContent = async ({ title = "", description = "" }) => {
		const streamContent = await muviLib.createContent({
			content_name: title,
			content_desc: description
		});

		writeDb({
			...db(),
			contents: [
				...db().contents ?? [],
				{
					...streamContent
				}
			]
		});

		return streamContent;
	}

	const startStream = async (contentId = null) => {
		const streamData = await muviLib.startStream(contentId);
		
		const content = db().contents.find(c => c.content_uuid === contentId);

		writeDb({
			...db(),
			streams: [
				...db().streams ?? [],
				{
					...streamData,
					content
				}
			]
		});

		return {
			...streamData,
			content
		};
	}

	const stopStream = async (streamId = null) => {
		await muviLib.stopStream(streamId);
		return true;
	}

	const streamDetails = async (streamId) => {
		const streamDetails = await muviLib.getStreamDetailsById(streamId);
		return streamDetails;
	}

	return {
		getStreamContentList,
		getStreamList,
		createStreamContent,
		startStream,
		stopStream,
		streamDetails
	};
};