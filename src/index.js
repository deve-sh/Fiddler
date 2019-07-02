// A React App for a basic WYSIWYG Editor.
// Home Page, consisting of all the components.
// And Routing.

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Styling

import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

import Home from "./home";
import App from "./app";
import fullPage from "./fullPage";
import UserPage from "./user";

const Index = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/user" component={UserPage} />
      <Route path="/app" component={App} />
      <Route path="/fullpage" component={fullPage} />
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
