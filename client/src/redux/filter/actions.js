import { FILTERSELECTED } from "./actionTypes";

export const filterSelected = (filter) => (dispatch) => {
    dispatch({
        type: FILTERSELECTED,
        payload: filter
    })
}