// Script For Code Mirror Text area for Syntax Highlighted and better Code.

import React from "react";
import CodeMirror from "react-codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css"; // Later to be changed to a modern version of VS Code.

require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css");
require("codemirror/mode/htmlmixed/htmlmixed");

const Codebox = props => {
  const handleChange = newCode => {
    props.updateCode(newCode);
  };

  let options = {
    mode: props.mode,
    lineNumbers: true,
    theme: "monokai"
  };

  return (
    <div className="codemirrorBox">
      <CodeMirror
        options={options}
        value={props.code.toString()}
        onChange={handleChange}
      />
    </div>
  );
};

Codebox.defaultProps = {
  mode: "javascript",
  updateCode: () => {},
  code: ""
};

export default Codebox;
