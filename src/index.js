import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import State from "./context/State";

ReactDOM.render(
  <State>
    <App />
  </State>,
  document.getElementById("root")
);
