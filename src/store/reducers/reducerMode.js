import { SET_MODE } from "@store/actionTypes";

const initialState = {
    isCalculatorOpen: false
};

const reducerMode = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MODE:
            return {
                ...state,
                isCalculatorOpen: payload
            }
        default:
            return state
    }
};

export default reducerMode;

