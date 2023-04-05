import { createReducer } from "../../utils/reducerUtils";
import {  GETUSERAVATAR, GETUSERBIO, GETUSERAVATARERROR, GETUSERBIOERROR, SETUSERBIO,
    SETUSERBIOERROR } from "./actionTypes";

const defaultState = {
    user: {},
    avatar_url: "",
    bio: "",
};

const entityHandlers = {
    [GETUSERAVATAR]: (state, payload) => {
        const { avatar_url } = payload;
        return { ...state, avatar_url }
    },
    [GETUSERAVATARERROR]: (state, payload) => {
        const error = payload;
        return { ...state, error }
    },
    [GETUSERBIO]: (state, payload) => {
        const bio  = payload;
        console.log(bio)
        return { ...state, bio }
    },
    [GETUSERBIOERROR]: (state, payload) => {
        const error = payload;
        return { ...state, error }
    },
    [SETUSERBIO]: (state, payload) => {
        const { bio } = payload;
        return { ...state, bio }
    },
    [SETUSERBIOERROR]: (state, payload) => {
        const error = payload;
        return { ...state, error }
    }
};

export const reducer = createReducer(defaultState, entityHandlers);