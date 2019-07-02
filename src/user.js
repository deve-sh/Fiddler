// React Page for User Sandboxes.

import React, { useState, useEffect } from "react";
import Header from "./header";
import { Link } from "react-router-dom";

// Styling

import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

const Backbone = require("./communicator");

const Sandbox = props => {
  let createdString = props.created.replace(/\//g, "-");

  const deleteSelf = e => {
    if (window.confirm("Are you sure you want to delete it?"))
      props.deleter(props.sid);
  };

  return (
    <div className="sandbox" style={{ overflow: "auto" }}>
      <Link
        style={{ color: "black", textDecoration: "none" }}
        to={"/app?sid=" + props.sid}
      >
        Sandbox <div className="sandboxid">{props.sid}</div>
      </Link>
      <div className="created">
        <em>{createdString}</em> &nbsp;
        <span className="btn btn-danger" onClick={deleteSelf}>
          <i className="fas fa-trash-alt" />
        </span>
      </div>
    </div>
  );
};

Sandbox.defaultPropts = {
  sid: "",
  created: new Date().toLocaleDateString(),
  deleter: () => {}
};

const User = () => {
  let [sandboxes, sandboxupdater] = useState([]);
  let [ismounted, toggleMount] = useState(false);

  useEffect(() => {
    toggleMount(true);

    let lsandboxes = localStorage.getItem("sandboxes");

    if (lsandboxes) {
      lsandboxes = JSON.parse(lsandboxes);

      sandboxupdater(lsandboxes.reverse()); // Reverse so as to get the newest first.
    }
  }, []);

  const deleteHandler = sid => {
    if (ismounted) {
      let lsandboxes = sandboxes;
      for (let i in lsandboxes) {
        if (sandboxes[i].sid === sid) {
          lsandboxes.splice(i, 1);
          localStorage.setItem("sandboxes", JSON.stringify(lsandboxes));

          if (localStorage.getItem("current") === sid) {
            localStorage.setItem("current", "");
          }
        }
      }

      sandboxupdater(lsandboxes.reverse()); // Rerender post updating.

      window.location.reload();
    }
  };

  return (
    <div id="userPage">
      <Header
        showSaveButton={false}
        saveButtonHandler={() => ""}
        showBoxes={false}
      />

      <div className="useroptions">
        <span style={{ fontSize: "1.15em" }}>
          Hola friend! You have{" "}
          {sandboxes.length === 1
            ? "1 sandbox "
            : sandboxes.length === 0
            ? "no sandbox "
            : sandboxes.length + " sandboxes "}{" "}
          on your system.
        </span>
        <br />
        <br />
        {sandboxes.length < 10 ? (
          <Link
            to={"/app?sid=" + Backbone.getSid()}
            style={{ color: "white", textDecoration: "none" }}
          >
            <div className="addmore">
              <div className="addmoreHeader">
                <i className="fas fa-plus-circle fa-lg" /> &nbsp;Add a Sandbox.
              </div>
            </div>
          </Link>
        ) : (
          ""
        )}
        {sandboxes.map((sandbox, index) => {
          return (
            <Sandbox
              deleter={deleteHandler}
              sid={sandbox.sid}
              key={index}
              created={sandbox.created}
            />
          );
        })}
        <br />
        And that should be it!
      </div>
    </div>
  );
};

export default User;
