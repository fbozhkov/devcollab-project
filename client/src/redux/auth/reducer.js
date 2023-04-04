import { createReducer } from "../../utils/reducerUtils";
import { LOGINSUCCESS, LOGINFAILED, LOGOUT } from './actionTypes';

const defaultState = {
    isLoggedIn: false,
    user: {},
    session: {},
};

const entityHandlers = {
    [LOGINSUCCESS]: (state, payload) => {
        console.log(payload)
        const user = payload.auth.user;
        const session = payload.auth.session;
        console.log(user)
        console.log(session)
        return { ...state, isLoggedIn: true, user, session }
    },
    [LOGINFAILED]: (state, action) => {
        const error = action;
        return { ...state, error }
    },
    [LOGOUT]: (state) => {
        return { ...defaultState };
    },
};

export const reducer = createReducer(defaultState, entityHandlers);