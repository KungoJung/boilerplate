import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactComp from "./ReactComp";

const Routes = () => {
  return(
    <Router>
      <Link to="/comp">React Component</Link>
      <Route exact path="/comp" component={ReactComp} />
    </Router>
  )
}

export default Routes
