import {
    LOGINSUCCESS,
    LOGINFAILED,
    LOGOUT,
    AUTHSUCCESS,
    AUTHFAILED
} from './actionTypes';
import axios from 'axios';
import { baseUrl } from '../../utils/apiBaseUrl'

export const loginRequest = ({ email, password }) => (dispatch) => {
    return axios.post(`${baseUrl}/api/users/sign-in`, {
        email: email,
        password: password
    },
    { withCredentials: true })
        .then((response) => {
            const auth = response.data;
            dispatch({
                type: LOGINSUCCESS,
                payload: { auth } 
            });

            return Promise.resolve();
        },
        (error) => {
            const errorMessage = error.response.data.message;
            dispatch({
                type: LOGINFAILED,
                payload: errorMessage
            });

            return Promise.reject(errorMessage);
        }
        );
}

export const logout = () => (dispatch) => {
    axios.get(`${baseUrl}/api/users/sign-out`, { withCredentials: true }); 
    dispatch({
        type: LOGOUT,
    });
}

export const authenticate = () => (dispatch) => {
    axios.get(`${baseUrl}/api/users/validateUser`, { withCredentials: true })
        .then((response) => {
            const auth = response.data;
            dispatch({
                type: AUTHSUCCESS
            });
        }
        )
        .catch((error) => {
            const errorMessage = error.response.data.message;
            dispatch({
                type: AUTHFAILED,
                payload: errorMessage
            });
        }
        );
}