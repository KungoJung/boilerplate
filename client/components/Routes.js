import React from "react";
import {  withRouter, Route, Link } from "react-router-dom";
import {connect} from "react-redux";
import ReactComp from "./ReactComp";
import Login from "./Login";
import UserPage from "./UserPage";
import Signup from "./Signup";
import { fetchMe } from "../redux/user";

class Routes extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchMe()
  }

  render() {
    if (this.props.userCurrentlyBeingFetched) {
      return (
        <h1>Loading...</h1>
      )
    }
    return(
      <div>
        <Link to="/comp">React Component</Link>
        <Login />
        <Link to="/signup">Sign Up</Link>
        <Route exact path="/comp" component={ReactComp} />
        <Route exact path="/home" component={UserPage} />
        <Route exact path="/signup" component={Signup} />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return { userCurrentlyBeingFetched: state.user.isFetching }
}

const mapDispatchToProps = (dispatch) => ({
  fetchMe: () => dispatch(fetchMe())
});

const Main = withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))

export default Main
