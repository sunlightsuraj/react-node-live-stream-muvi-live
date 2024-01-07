import Contents from "../components/StreamContents/contents";
import Streams from "../components/StreamContents/streams";
import StreamWatch from "../components/StreamWatch";

const Home = () => {
	return (
		<div>
			<div className="mt-5">

			</div>
			<div className="container text-center">
				<div className="row">
					<div className="col">
						<Contents />
					</div>
					<div className="col">
						<Streams />
					</div>
					<div className="col">
						Watch Live Stream
						<StreamWatch />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;