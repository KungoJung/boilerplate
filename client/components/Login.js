import React from "react";
import LocalLoginForm from "./LocalLoginForm";
import OAuthLoginForm from "./OAuthLoginForm";

const Login = (props) => {
  return(
    <div>
      <p>Log In</p>
      <LocalLoginForm />
      <OAuthLoginForm />
    </div>
  )
}

export default Login
