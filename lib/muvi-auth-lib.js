const axios = require("axios");
const { db, writeDb } = require("../db/index");

module.exports = () => {
	const getAuthToken = async () => {
		console.log('db', db());
		if (db().accessToken) {
			return db().accessToken;
		}

		const { data } = await axios.post(`${process.env.MUVI_API_SERVER}get-user-token-details`, {
			app_id: process.env.MUVI_APP_ID,
			secret_key: process.env.MUVI_SECRET_KEY
		});

		if (data.code !== 200) {
			throw "Failed to get muvi access token.";
		}

		writeDb({
			...db(),
			accessToken: data.response.access_token,
			refreshToken: data.response.refresh_token
		});

		return data.response.access_token;
	}

	const refreshAuthToken = () => {

	}

	return {
		getAuthToken,
		refreshAuthToken
	};
}