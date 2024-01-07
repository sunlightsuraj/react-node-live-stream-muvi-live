import { useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import { getContents, saveContent } from "../../services/content.service";
import { startStream } from "../../services/stream.service";
import { useStreamContext } from "../../context/stream-context";

const Contents = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [contents, setContents] = useState([]);
	const { streams, setStreams } = useStreamContext();
	const [title, setTitle] = useState();

	const loadContents = () => {
		getContents().then((streamContents) => {
			setContents(streamContents.data);
		}).catch(err => {
			enqueueSnackbar(err, { variant: "error" });
		});
	}

	const onClickAddContent = () => {
		saveContent(title).then((streamContent) => {
			setContents([
				streamContent,
				...contents
			]);
		})
	}

	const onClickStartStream = (content) => {
		startStream(content.content_uuid).then((livestream) => {
			setStreams([
				...streams,
				livestream
			]);
		}).catch(err => {
			enqueueSnackbar(err, { variant: "error" });
		})
	}

	useEffect(() => {
		loadContents();
	}, []);

	return (
		<div>
			Stream Content List
			<hr />
			<div className="d-flex">
				<input type="text" placeholder="title"
					className="form-control form-control-sm"
					value={title} onChange={(e) => setTitle(e.target.value)} />

				<button className="btn btn-sm btn-primary"
					onClick={onClickAddContent}>Add Content</button>
			</div>
			<hr />
			<div className="list-group">
				{
					contents.length ? contents.map(content => {
						return (
							<div className="list-group-item" key={`${content.content_uuid}`}>
								<span className="float-left">{content.content_name}</span>
								<button className="ml-3 btn btn-primary btn-sm rounded float-right" onClick={() => onClickStartStream(content)}>Start Stream</button>
							</div>
						)
					}) : null
				}
			</div>
		</div>
	)
}

export default Contents;