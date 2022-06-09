import { SET_MODE } from "./actionTypes"


export const setMode = (payload) => {
    return function (dispatch) {
        dispatch({ type: SET_MODE, payload })
    }
}