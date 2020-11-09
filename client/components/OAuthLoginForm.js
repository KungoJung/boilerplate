import React from "react";

const OAuthLoginForm = () => {
  return (
    <form method="get" action="/auth/google">
      <button type="submit">Log In With Google</button>
    </form>
  )
}

export default OAuthLoginForm;
