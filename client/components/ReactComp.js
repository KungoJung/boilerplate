import React from "react";
import { connect } from "react-redux";

const ReactComp = (props) => {
  return(
    <div>
      <select>
        <option defaultValue="Pick One">Pick One</option>
        <option value={1}>1</option>
      </select>
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    // whichever part of state >> key: state.thatKey
  })
}

export default connect(mapStateToProps)(ReactComp)
