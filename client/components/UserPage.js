import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {logout} from "../redux/user";

const UserPage = (props) => {
  console.log(props)
  const {user, handleClick} = props;

  if (!user.id) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1>Welcome back {user.email}</h1>
      <form onSubmit={handleClick}>
        <button type="submit" id="logout" >Log Out</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    user: state.user
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history;
  return {
    async handleClick() {
      const thunk = logout();
      await dispatch(thunk);
      history.push("/")
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
