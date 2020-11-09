import React from "react";
import { connect } from "react-redux";
import { login } from "../redux/user";

const LocalLoginForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <label htmlFor="email">Email</label>
      <input type="email" name="email"></input>
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" name="password"></input>
    </div>
    <button type="submit" id="submit-form">Submit</button>
  </form>
)

const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history;
  return {
    async handleSubmit(e) {
      console.log(e.target.email.value)
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

export default connect(null, mapDispatchToProps)(LocalLoginForm)
