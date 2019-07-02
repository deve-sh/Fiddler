import React from "react";

import { Link } from "react-router-dom";
// The Home Component, when the user visits the app at initial.

import Header from "./homeheader";
import webdev from "./files/webdeveloper.png";
import codeReview from "./files/codereview.png";
import personalData from "./files/personaldata.png";
import featurePacked from "./files/featurepacked.png";

const Backbone = require("./communicator");

const Home = props => {
  return (
    <div id="home">
      <Header />
      <section id="homeintro">
        <div
          className="row homeintroflex"
          style={{ maxWidth: 1100, margin: "0 auto" }}
        >
          <div className="col-md-6">
            <div className="intro">
              <span className="introheading" style={{ fontFamily: "Lato" }}>
                Hey There Fiddler!
              </span>
              <br />
              <br />
              <p>
                If you came here, you might know what this is about. If not,
                well, this place is for all your web dev tryouts!
                <br />
                <br />
                Scroll down to see what that means.
              </p>
              <br />
              <div className="buttonsetContainer">
                <Link to={"/app?sid=" + Backbone.getSid()}>
                  <span
                    className="btn btn-primary"
                    style={{ marginRight: "0.6rem" }}
                  >
                    Create New
                  </span>
                </Link>
                <Link to={"/user"}>
                  <span className="btn btn-info">Your Sandboxes</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6" style={{ textAlign: "center" }}>
            <img src={webdev} alt={"Web Developer"} className="resimage" />
          </div>
        </div>
      </section>
      <section className="continuation" style={{ background: "#0071ff" }}>
        <div
          className="continuation-includer"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "1rem" }}
        >
          <div className="row">
            <div
              className="col-md-6 imagecolumn"
              style={{ textAlign: "center" }}
            >
              <img src={codeReview} alt="Code Review" className="resimage" />
            </div>
            <div className="col-md-6 descriptor">
              <h2 style={{ fontFamily: "Lato" }}>What it is.</h2>
              <br />
              <p>
                A sandbox is basically a workplace that lets you test around
                code that would otherwise be tedious to do.
              </p>
              <p>
                Fiddler gives you a local environment to practise your HTML, CSS
                and JS. Try it out now!
              </p>
              <p>
                <Link to="/user">
                  <button className="btn-applink">Try it yourself!</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="continuation">
        <div
          className="continuation-includer"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "1rem" }}
        >
          <div className="row columnreverser">
            <div className="col-md-6 descriptor">
              <h2 style={{ fontFamily: "Lato" }}>Its all with you!</h2>
              <br />
              <p>All the data is stored inside your own browser.</p>
              <p>
                With that comes the functionality of quick saving and access.
                Plus, sync your browser and you get the sandboxes you saved even
                on your phone!
              </p>
              <p>
                As a result, the web app is faster than Codepen and a much
                cooled down version of it. Moreover, its free and always will
                be.
              </p>
              <p>
                <Link to="/user">
                  <button className="btn-applink">Try it yourself!</button>
                </Link>
              </p>
            </div>
            <div className="col-md-6 imagecolumn">
              <img
                src={personalData}
                alt={"Personal Data"}
                className="resimage"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="continuation" style={{ background: "#232f34" }}>
        <div
          className="continuation-includer"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "1rem" }}
        >
          <div className="row">
            <div className="col-md-6 imagecolumn">
              <img
                src={featurePacked}
                className="resimage"
                alt="Feature Packed"
              />
            </div>
            <div className="col-md-6 descriptor">
              <h2 style={{ fontFamily: "Lato" }}>Feature Packed!</h2>
              <br />
              <p>
                Fiddler is packed with features, and new features will be added
                every now and then.
              </p>
              <p>
                Some highlights include fast storage of code, auto-reload,
                syntax highlighting and more! Now go check it out!
              </p>
              <p>
                <Link to="/user">
                  <button className="btn-applink">Try it yourself!</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footercontainer row">
          <div className="col-8" style={{ padding: "2.5rem" }}>
            Created by{" "}
            <a
              style={{ color: "white", fontSize: "1.2em" }}
              href="https://deve-sh.github.io"
              target="_blank"
              rel="noreferrer noopener"
            >
              Devesh
            </a>
            .
          </div>
          <div
            className="col-4"
            style={{ padding: "2.5rem", fontSize: "1.3em", textAlign: "right" }}
          >
            <a
              href="https://github.com/deve-sh/Fiddler"
              title="Github Code"
              target="_blank"
              style={{ color: "white" }}
              rel="noreferrer noopener"
            >
              <i className="fab fa-github fa-lg" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
