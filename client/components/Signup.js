import React from "react";
import { connect } from "react-redux";
import { login } from "../redux/user";

const Signup = (props) => {
  // This whole page needs to be created!
  return(
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email"></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password"></input>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history;
  return {
    async handleSubmit(e) {
      e.preventDefault()
      // trigger thunk
      const thunk = login({
        email: e.target.email.value,
        password: e.target.password.value
      })
      await dispatch(thunk);
      // once that is complete, redirect to home
      history.push("/home");
    }
  }
}

export default connect(null, mapDispatchToProps)(Signup)
