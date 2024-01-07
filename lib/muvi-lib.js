const { default: axios } = require("axios");
const muviAuthLib = require("./muvi-auth-lib");

module.exports = () => {
	let accessToken = null;
	if (accessToken == null) {
		muviAuthLib().getAuthToken().then(token => accessToken = token);
	}

	const getConfig = () => ({
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	const createContent = async ({ content_name = "",  content_desc = "" }) => {
		const { data } = await axios.post(`${process.env.MUVI_API_SERVER}stream/create`, {
			content_name,
			content_desc,
			stream_type: 1
		}, getConfig());

		if (data.code !== 200) {
			throw "Failed to create stream content.";
		}

		return data.data;
	};

	const getStreamContents = async () => {
		const { data } = await axios.post(`${process.env.MUVI_API_SERVER}livestream`, {
			"query": "{ contentList(product_key:\":product_key\",app_token:\":app_token\",extension:\"live\",content_name:\"\",sort_by:\"nto\",page:0,per_page:10){ page_info{total_count} content_list{content_uuid content_name content_desc content_created_date content_permalink custom_field_data { custom_field_value custom_field_name }} stream_list {livestream_uuid stream_type content_uuid server_state status app_token product_key m5ext stream_key}}}"
		}, getConfig());

		
	}

	const getContentById = () => {

	};

	const getStreams = () => {

	};

	const startStream = async (content_uuid) => {
		const { data } = await axios.post(`${process.env.MUVI_API_SERVER}stream/start`, {
			content_uuid,
			device_type: 1
		}, getConfig());

		if (data.code !== 200)
			throw "Failed to start stream";

		return data.data;
	};

	const stopStream = async (livestream_uuid) => {
		const { data } = await axios.post(`${process.env.MUVI_API_SERVER}stream/stop`, {
			livestream_uuid
		}, getConfig());

		if (data.code !== 200)
			throw "Failed to stop stream.";

		return true;
	};

	const getStreamDetailsById = async (livestream_uuid) => {
		const { data } = await axios.post(`${process.env.MUVI_API_SERVER}getStreamDetails`, {
			query:`{ livestreamDetails(livestream_uuid:"${livestream_uuid}",status:1) {stream_key stream_url stream_play_url} }`
		}, getConfig());

		if (data.code !== 200)
			throw "Failed to get stream details";

		return data.data.livestreamDetails;
	};

	return {
		createContent,
		getContentById,
		getStreams,
		startStream,
		stopStream,
		getStreamDetailsById
	}
}