// Script to view the entire code of a sandbox.

import React, { useState, useEffect } from "react";
const Backbone = require("./communicator");
const DOMPurify = require("dompurify");

const jsMounter = (isMounted = true, js = "") => {
	if (isMounted === true) {
		let componenttoMount = document.createElement("script");
		componenttoMount.innerHTML = js;
		document.getElementById("root").append(componenttoMount);
	}
};

const FullPageApp = (props) => {
	// State Variables
	// Get the current sid or the sid from the URL first.

	let [pageToShow, pageUpdater] = useState(
		"Psst... Psst... Your Output shows here."
	);

	let [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const CodeGetter = () => {
			let sandboxId = props?.match?.params?.sid;

			if (sandboxId) {
				if (sandboxId.length === 32) {
					if (Backbone.validateSID(sandboxId)) {
						let code = Backbone.retreiveData(sandboxId).code;

						let { html, css, js } = code;

						const totalPage = `<style type='text/css'>${css.toString()}</style>${html.toString()}`;

						pageUpdater(totalPage);
						jsMounter(mounted, js);
					}
				} else {
					throw new Error("Invalid SID.");
				}
			} else {
				throw new Error(
					"You need to pass a valid SID in the URL to view its full page version."
				);
			}
		};

		CodeGetter();
	}, []);

	const DOMElement = (
		<div
			className="previewBox"
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(pageToShow, { FORCE_BODY: true }),
			}}
		/>
	);

	return DOMElement;
};

export default FullPageApp;
