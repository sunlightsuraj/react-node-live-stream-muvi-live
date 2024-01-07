import { useStreamContext } from "../../context/stream-context";
import { useSnackbar } from 'notistack';
import { getLivestreamDetails, getStreams, stopStream } from "../../services/stream.service";
import { useEffect } from "react";

const Streams = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { streams, setSelectedStream } = useStreamContext();

	
	const onClickStopStream = (stream) => {
		stopStream(stream.livestream_uuid).then(() => {
			enqueueSnackbar("Stream stop request sent.");
		}).catch(err => {
			enqueueSnackbar(err, { variant: "error" });
		});
	}

	const onClickWatch = (stream) => {
		setSelectedStream(stream);
	}

	const onClickDetail = (stream) => {
		getLivestreamDetails(stream.livestream_uuid).then(streamDetails => {
			console.log('streamDetail', streamDetails);
		}).catch(err => {
			enqueueSnackbar(err, { variant: "error" });
		})
	}

	return (
		<div>
			Live Stream List
			<hr />
			
			<div className="list-groups">
				{
					streams.length ? streams.map((stream, idx) => {
						return (
							<div className="list-group-item mt-3" key={`${stream.livestream_uuid}-${idx}`}>
								<div>
								<span>{ stream?.content?.content_name }</span>
								<div className="float-right">
									<button className="btn btn-info btn-sm rounded ml-3" onClick={() => onClickDetail(stream)}>Detail</button>
									<button className="btn btn-primary btn-sm rounded ml-3" onClick={() => onClickStopStream(stream)}>Stop Stream</button>
									<button className="btn btn-success btn-sm rounded ml-3" onClick={() => onClickWatch(stream)}>Watch</button>
								</div>
								</div>
								<hr />
							</div>
						)
					}) : null
				}
			</div>
		</div>
	)
}

export default Streams;