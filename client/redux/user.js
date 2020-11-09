import redux from "redux";
import axios from "axios";

// Action Types
const GET_USER = "GET_USER";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";

// Action Creators
const gotMe = user => {
  return({
    type: GET_USER,
    user
  })
}

const setFetchingStatus = isFetching => {
  return({
    type: SET_FETCHING_STATUS,
    isFetching
  })
}

// Thunks
export const login = credentials => {
  return async (dispatch) => {
    const {data} = await axios.put("/auth/login", credentials);
    dispatch(gotMe(data))
  }
}

export const fetchMe = () => {
  return async (dispatch) => {
    try {
      dispatch(setFetchingStatus(true))
      const {data} = await axios.get("/auth/me");
      dispatch(gotMe(data));
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(setFetchingStatus(false));
    }
  }
}

export const logout = () => {
  return async dispatch => {
    await axios.delete("/auth/logout");
    dispatch(gotMe({}))
  }
}

export const signup = credentials => {
  return async (dispatch) => {
    const {data} = await axios.post("/auth/signup", credentials);
    // pick up from here
    dispatch()
  }
}

// Initial State
const INITIAL_STATE = {
  isFetching: true
};

function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching
      }
    default:
      return state
  }
}

export default reducer;
