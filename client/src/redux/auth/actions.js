import {
    LOGINSUCCESS,
    LOGINFAILED,
    LOGOUT
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
            return response.data;
        })
        .then((userData) => {
            dispatch({
                type: LOGINSUCCESS,
                payload: { email, userData } 
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
    axios.get(`${baseUrl}/api/users/log-out`, { withCredentials: true }); 
    dispatch({
        type: LOGOUT,
    });
}
