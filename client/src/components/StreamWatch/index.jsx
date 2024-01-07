import { useEffect, useRef, useState } from "react";
import { useStreamContext } from "../../context/stream-context";
import { getLivestreamDetails } from "../../services/stream.service";
import { useSnackbar } from "notistack";
import VideoJS from "./video-js";

const StreamWatch = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { selectedStream } = useStreamContext();
	const [streamDetails, setStreamDetails] = useState(null);

	const playerRef = useRef(null);

	const videoJsOptions = {
		autoplay: true,
		controls: true,
		responsive: true,
		fluid: true,
		sources: [{
			src: streamDetails?.stream_play_url,
			type: "application/x-mpegURL"
		}]
	};

	const handlePlayerReady = (player) => {
		playerRef.current = player;

		// You can handle player events here, for example:
		player.on('waiting', () => {
			console.log('player is waiting');
		});

		player.on('dispose', () => {
			console.log('player will dispose');
		});
	};

	const getStreamDetails = () => {
		if (!selectedStream) {
			enqueueSnackbar("No livestream selected!", {
				variant: "error"
			});
			return;
		}

		getLivestreamDetails(selectedStream.livestream_uuid).then((streamDetails) => {
			if (streamDetails) {
				setStreamDetails(streamDetails);
			}
		}).catch(err => {
			enqueueSnackbar(err, {
				variant: "error"
			});
		})
	}

	useEffect(() => {
		getStreamDetails();
	}, [selectedStream]);

	// useEffect(() => {
	// 	if (streamDetails) {
	// 		const stream_play_url = streamDetails?.stream_play_url;
	// 		const type = stream_play_url.split(".")[1];
	// 		setVideoJsOptions({
	// 			...videoJsOptions,
	// 			sources: [{
	// 				src: stream_play_url,
	// 				type: "application/x-mpegURL"
	// 			}]
	// 		});
	// 	}
	// }, [streamDetails]);

	return (
		<div>
			<span>Live Watch</span>
			<div>
				{
					streamDetails ? (
						<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
					) : null
				}
			</div>
			<hr />
			<div>
				{ 
					streamDetails? (
						<ul>
							<li>Stream Url: <pre>{ streamDetails.stream_url }</pre></li>
							<li>Stream Key: <pre>{ streamDetails.stream_key }</pre></li>
							<li>Stream Play Url: <pre>{ streamDetails.stream_play_url }</pre></li>
						</ul>
					) : null
				}
			</div>
		</div>
	)
}

export default StreamWatch;