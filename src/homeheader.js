// Header Component to be used in the home component.

import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <div id="header">
      <div
        className="headercontainer row"
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          className="col-8"
          style={{
            textAlign: "left",
            padding: "0.75rem",
            fontFamily: "Open Sans, Lato, sans-serif"
          }}
        >
          <i title="Atom" className="fas fa-atom fa-lg fa-spin" /> &nbsp;
          <span>Fiddler</span>
        </div>
        <div className="col-4" style={{ padding: "1rem", textAlign: "right" }}>
          <Link to="/user" title={"View all SandBoxes."}>
            <i className="fas fa-boxes fa-lg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
