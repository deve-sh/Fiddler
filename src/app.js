// A React App for a basic WYSIWYG Editor.

import React, { useState } from "react";

// Components

import { ToastContainer, toast } from "react-toastify";
import PreviewBox from "./previewbox";
import Codebox from "./codemirrorbox";
import CSSEditor from "./csseditor";
import Header from "./header";
import jsPreprocessor from "./preprocessor";

import "react-toastify/dist/ReactToastify.css";

const Backbone = require("./communicator");

// DOM purify so no user can attack the system with XSS Attacks.

const DOMPurify = require("dompurify");

const AppName = Object.freeze(
  <div className="zjrR8H1Zse9yjFvJ9j3DLTMAB">{"Fiddler"}</div>
);

// Main App Component to handle everything.

const App = () => {
  // Get the SID that the Sandbox belongs to.
  // And set everything else.

  let sid = Backbone.getQueryP();

  if (sid) {
    // If the url has been passed with an sid. Then set the currently open sandbox as the default.
    if (sid.length === 32) {
      if (Backbone.validateSID(sid)) {
        // If the local Storage consists of a sandbox with the SID.

        localStorage.setItem("current", sid.toString());
      } else {
        // The passed SID does not exist in the localStorage.
        // Create a new entry with the sid in the localStorage.

        let sandboxes = Backbone.checkForSB(); // Get the list of sandboxes.

        // Add the new sandbox to the list.

        sandboxes = [
          ...sandboxes,
          {
            sid,
            code: {},
            created: new Date().toLocaleDateString()
          }
        ];

        // Update the local Storage.

        localStorage.setItem("sandboxes", JSON.stringify(sandboxes));
        localStorage.setItem("current", sid.toString());
      }
    } else {
      toast.error("Invalid SID Passed.");
      throw new Error("Invalid SID.");
    }
  } else {
    // If the sid in the url has not been passed. Then get a new SID and add it to the localStorage.

    // But first, check if the localStorage has a current sandbox registered. If yes, just open it. If not, proceed to what was described earlier.

    if (
      localStorage.getItem("current") &&
      Backbone.validateSID(localStorage.getItem("current"))
    ) {
      // If there is a current sandbox and the sandbox is listed in the list. Then do nothing.
    } else {
      let newSid = Backbone.getSid(); // Retreive new SID.

      let newSandBox = {
        sid: newSid,
        code: {},
        created: new Date().toLocaleDateString()
      };

      let listofsandboxes = Backbone.checkForSB();

      listofsandboxes = [...listofsandboxes, newSandBox];

      localStorage.setItem("sandboxes", JSON.stringify(listofsandboxes));
      localStorage.setItem("current", newSid.toString()); // Set the current sandbox.
    }
  }

  // State Variables and their updaters using Hooks.
  // The inital values have been taken directly from the localStorage as they don't need any setting up of the components.

  let [HTMLtoDisplay, htmlupdater] = useState(() => {
      if (localStorage.getItem("current")) {
        let html = Backbone.retreiveData(localStorage.getItem("current")).code
          .html;

        return html ? html : "";
      }

      return "";
    }),
    [CSStoRender, cssupdater] = useState(() => {
      if (localStorage.getItem("current")) {
        let css = Backbone.retreiveData(localStorage.getItem("current")).code
          .css;

        return css ? css : "";
      }

      return "";
    }),
    [JStoParse, jsupdater] = useState(() => {
      if (localStorage.getItem("current")) {
        let js = Backbone.retreiveData(localStorage.getItem("current")).code.js;

        return js ? js : "";
      }

      return "";
    });

  const saveHandler = () => {
    // Function to handle saving of the app.
    // First step. Get the sid from localstorage or cookie or the window location.

    let currentId = localStorage.getItem("current");

    if (currentId) {
      // The current sandbox needs to be saved.

      const code = {
        html: HTMLtoDisplay.toString(),
        css: CSStoRender.toString(),
        js: JStoParse.toString()
      };

      if (Backbone.validateSID(currentId)) {
        // Save it if there exists an entry with currentId.

        let listofsandboxes = Backbone.checkForSB();

        for (let i in listofsandboxes) {
          if (listofsandboxes[i].sid === currentId) {
            listofsandboxes[i].code = code;
          }
        }

        // Setting the localstorage this way.

        localStorage.setItem("sandboxes", JSON.stringify(listofsandboxes));

        toast.success("Saved!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    }
  };

  const jsHandler = () => {
    // Function to render JavaScript typed.

    let scriptTag = document.querySelector(".previewBox > #scriptures");
    if (scriptTag) {
      // If the script tag already exists. Delete the node.
      scriptTag.remove();
    }

    // Create the script tag and re-render it.

    try {
      scriptTag = document.createElement("script");
      scriptTag.id = "scriptures";

      scriptTag.innerHTML = `function nkJTlv8GGbQJkLF3vSJS8WQEV(){${jsPreprocessor(
        JStoParse
      )}}\nnkJTlv8GGbQJkLF3vSJS8WQEV();`;

      document.getElementsByClassName("previewBox")[0].append(scriptTag);
    } catch (e) {
      toast.error("A JavaScript error occured.");
      console.error(e);
    }
  };

  let HTMLtoRender = `
    ${HTMLtoDisplay}
  `; // Converting to an actual string.

  return (
    <div className="editorpage">
      <Header
        appName={AppName}
        showSaveButton={true}
        saveButtonHandler={saveHandler}
      />
      <div className="editorops">
        <div id="editor-app">
          <div className="row">
            <div className="col-md-6 editors">
              <div>
                HTML :
                <br />
                <Codebox
                  updateCode={htmlupdater}
                  code={HTMLtoDisplay}
                  mode={"htmlmixed"}
                />
              </div>
              <div>
                CSS:
                <Codebox
                  updateCode={cssupdater}
                  code={CSStoRender}
                  mode={"css"}
                />
              </div>
              <div>
                JavaScript:
                <Codebox
                  updateCode={jsupdater}
                  code={JStoParse}
                  mode={"javascript"}
                />
                <br />
                <div className="jshandler btn btn-info" onClick={jsHandler}>
                  Execute JavaScript
                </div>
              </div>
            </div>
            <div className="col-md-6 browserWindow">
              {/* The next block is for local styles that the user shall add. */}
              <style type="text/css">{CSSEditor(CSStoRender)}</style>
              {/* The next is the actual preview box for the HTML the user typed in. */}
              <PreviewBox
                currentSID={localStorage.getItem("current")}
                HTMLToDisplay={DOMPurify.sanitize(HTMLtoRender)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ToastContainer for Alerts and messages. */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
