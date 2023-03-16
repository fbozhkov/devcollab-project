import { createReducer } from "../../utils/reducerUtils";
import { FILTERSELECTED } from "./actionTypes";

const initialState = {
    filter: "all",
};

const entityHandlers = {
    [FILTERSELECTED]: (state, payload) => {
        return {
            ...state,
            filter: payload,
        };
    }
};

export const reducer = createReducer(initialState, entityHandlers);