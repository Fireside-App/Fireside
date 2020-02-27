import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "react-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
