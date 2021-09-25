import React from "react";
import { Link } from "react-router-dom";
// Component to display the rendered HTML.

const PreviewBox = (props) => {
	let currentSID = props.currentSID
		? props.currentSID
		: localStorage.getItem("current");

	const HTMLtoRender = { __html: props.HTMLToDisplay.toString() };

	return (
		<React.Fragment>
			<div className="top row" style={{ flexDirection: "row", width: "100%" }}>
				<div className="col-4" style={{ paddingLeft: "0" }}>
					<span className="dot" style={{ background: "#ED594A" }} />
					<span className="dot" style={{ background: "#FDD800" }} />
					<span className="dot" style={{ background: "#5AC05A" }} />
				</div>
				<div className="col-6" />
				<div className="col-2" style={{ textAlign: "right", paddingRight: 5 }}>
					<Link
						to={"/sandbox/" + currentSID}
						style={{ color: "gray" }}
						title={"View Full Page"}
					>
						<i className="far fa-window-maximize" />
					</Link>
				</div>
			</div>
			<div className={props.className} dangerouslySetInnerHTML={HTMLtoRender} />
		</React.Fragment>
	);
};

PreviewBox.defaultProps = {
	className: "previewBox",
	currentSID: "",
};

export default PreviewBox;
