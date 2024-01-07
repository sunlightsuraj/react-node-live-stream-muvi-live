import { createContext, useContext, useEffect, useState } from "react";
import { getStreams } from "../services/stream.service";
import { useSnackbar } from "notistack";

export const StreamContext = createContext({
	streams: [],
	setStreams: null,
	selectedStream: null,
	setSelectedStream: null
});

export const useStreamContext = () => useContext(StreamContext);

export const StreamWrapper = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar();
	const [streams, setStreams] = useState([]);
	const [selectedStream, setSelectedStream] = useState(null);

	const loadStreams = () => {
		getStreams().then((livestreams) => {
			setStreams([
				...livestreams.data
			]);
		}).catch(e => {
			enqueueSnackbar(e, { variant:"error" });
		});
	}

	useEffect(() => {
		loadStreams();
	}, []);

	return (
		<StreamContext.Provider value={{ streams, setStreams, selectedStream, setSelectedStream }}>
			{ children }
		</StreamContext.Provider>
	)
}