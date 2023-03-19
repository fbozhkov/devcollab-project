import { createReducer } from "../../utils/reducerUtils";
import { LOGINSUCCESS, LOGINFAILED, LOGOUT } from './actionTypes';

const defaultState = {
    isLoggedIn: false,
};

const entityHandlers = {
    [LOGINSUCCESS]: (state, action) => {
        // TODO: update login
        const login = action.login;
        const accessToken = action.userData.accessToken;
        const admin = action.userData.admin;
        return { ...state, isLoggedIn: true, login, accessToken, admin }
    },
    [LOGINFAILED]: (state, action) => {
        // TODO: update login
        const error = action;
        return { ...state, error }
    },
    [LOGOUT]: (state) => {
        // TODO: update logout
        return { ...defaultState };
    },
};

export const reducer = createReducer(defaultState, entityHandlers);