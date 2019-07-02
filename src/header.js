// Header Component for the App

import React from "react";
import { Link } from "react-router-dom";

const AppName = Object.freeze("Fiddler");

const Header = props => {
  return (
    <header id="header">
      <div className="headerContainer row">
        <div className="col-5" style={{ padding: "0.75rem" }}>
          <div className="zjrR8H1Zse9yjFvJ9j3DLTMAB">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <i className="fas fa-atom fa-spin fa-lg" /> {AppName}
            </Link>
          </div>
        </div>
        <div
          className="col-7 headerright"
          style={{ textAlign: "right", padding: "0.75rem" }}
        >
          {/* User Options */}

          {props.showBoxes ? (
            <Link to="/user" style={{ color: "white" }}>
              <span
                className="btn btn-primary"
                title={"View all your sandboxes."}
                style={{
                  cursor: "pointer",
                  background: "transparent",
                  border: "none"
                }}
                onClick={props.saveButtonHandler}
              >
                <i className="fas fa-boxes fa-lg" />
              </span>
            </Link>
          ) : (
            ""
          )}

          {props.showSaveButton ? (
            <span
              className="btn btn-primary"
              title={"Save Sandbox."}
              style={{
                cursor: "pointer",
                background: "transparent",
                border: "none"
              }}
              onClick={props.saveButtonHandler}
            >
              <i className="fas fa-save fa-lg" />
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  loggedIn: false,
  showSaveButton: false,
  showBoxes: true,
  saveButtonHandler() {
    return "";
  }
};

export default Header;
