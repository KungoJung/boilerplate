import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./client/store";
import Main from "./client/components/Routes";
import "./public/style.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <h1>Hello, World!!!</h1>
      <Main />
    </Router>
  </Provider>,
  document.getElementById("app")
)
