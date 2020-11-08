import redux from "redux";

// Action Types
const GET_USER = "GET_USER"

// Action Creators
export const gotMe = user => {
  return({
    type: GET_USER,
    user
  })
}

// Thunks


// Initial State
const INITIAL_STATE = {};

function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state
  }
}

export default reducer;
