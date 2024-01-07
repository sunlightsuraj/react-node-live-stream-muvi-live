import axios from "axios"
import env from "../env";

export const getContents = async () => {
	try {
		const { data } = await axios.get(`${env.SERVER}/api/get-stream-contents`);
		if (!data.success)
			throw data.message;

		return data.streamContents;
	} catch (err) {
		return Promise.reject(err);
	}
}

export const saveContent = async (title) => {
	try {
		const { data } = await axios.post(`${env.SERVER}/api/create-stream-content`, {
			title
		});
		if (!data.success)
			throw data.message;

		return data.streamContent;
	} catch (err) {
		return Promise.reject(err);
	}
}



