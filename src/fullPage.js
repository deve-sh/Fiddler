// Script to view the entire code of a sandbox.

import React, { useState, useEffect } from "react";
const Backbone = require("./communicator");

const jsMounter = (isMounted = true, js = "") => {
  if (isMounted === true) {
    let componenttoMount = document.createElement("script");
    componenttoMount.innerHTML = js;
    document.getElementById("root").append(componenttoMount);
  }
};

const FullPageApp = () => {
  // State Variables
  // Get the current sid or the sid from the URL first.

  let [pageToShow, pageUpdater] = useState(
    "Psst... Psst... Your Output shows here."
  );

  let [mounted, mounter] = useState(false);

  const CodeGetter = () => {
    let sid = Backbone.getQueryP();

    if (sid) {
      if (sid.length === 32) {
        if (Backbone.validateSID(sid)) {
          let code = Backbone.retreiveData(sid).code;

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

  useEffect(() => {
    mounter(true);
    CodeGetter();
  });

  const DOMElement = (
    <div
      className="previewBox"
      dangerouslySetInnerHTML={{ __html: pageToShow }}
    />
  );

  return DOMElement;
};

export default FullPageApp;

// Tests not Passing! Still a lot of work to do here.
