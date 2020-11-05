import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./client/store";
import Routes from "./client/components/Routes";
import "./public/style.css";

ReactDOM.render(
  <Provider store={store}>
    <h1>Hello, World!!!</h1>
    <Routes />
  </Provider>,
  document.getElementById("app")
)
