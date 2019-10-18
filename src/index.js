import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("app");

console.log("root", root);

ReactDOM.render(
    React.createElement(
        "button",
        {},
        "I am a button, Hello world"
    ),
    root,
);