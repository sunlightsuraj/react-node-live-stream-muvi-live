import axios from "axios";
import env from "../env";

export const startStream = async (contentId) => {
	try {
		const { data } = await axios.post(`${env.SERVER}/api/start-stream`, {
			contentId
		});

		if (!data.success)
			throw data.message;

		return data.livestream;
	} catch (err) {
		return Promise.reject(err);
	}
}

export const getStreams = async () => {
	try {
		const { data } = await axios.get(`${env.SERVER}/api/get-streams`);
		if (!data.success)
			throw data.message;

		return data.livestreams;
	} catch (err) {
		return Promise.reject(err);
	}
}

export const stopStream = async (livestreamId) => {
	try {
		const { data } = await axios.post(`${env.SERVER}/api/stop-stream`, {
			livestreamId
		});
		if (!data.success)
			throw data.message;

		return true;
	} catch (err) {
		return Promise.reject(err);
	}
}

export const getLivestreamDetails = async (livestreamId) => {
	try {
		const { data } = await axios.get(`${env.SERVER}/api/stream-details/${livestreamId}`);
		if (!data.success)
			throw data.message;

		return data.streamDetails;
	} catch (err) {
		return Promise.reject(err);
	}
}