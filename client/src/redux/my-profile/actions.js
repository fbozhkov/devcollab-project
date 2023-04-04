import {
    GETUSERAVATAR,
    GETUSERBIO,
    GETUSERAVATARERROR,
    GETUSERBIOERROR,
    SETUSERBIO,
    SETUSERBIOERROR
} from './actionTypes';
import axios from 'axios';
import { baseUrl } from '../../utils/apiBaseUrl'

export const getUserAvatar = (userId) => (dispatch) => {
    axios.get(`${baseUrl}/api/users/getUserAvatar/${userId}`, { withCredentials: true })
        .then((response) => {
            dispatch({
                type: GETUSERAVATAR,
                payload: response.data
            });
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: GETUSERAVATARERROR,
                payload: error
            });
        })
}

export const getUserBio = (userId) => (dispatch) => {
    axios.get(`${baseUrl}/api/users/getUserBio/${userId}`)
        .then((response) => {
            dispatch({
                type: GETUSERBIO,
                payload: response.data
            });
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: GETUSERBIOERROR,
                payload: error
            });
        })
}

export const setUserBio = ({bio,github,linkedIn,twitter}) => (dispatch) => {
    axios.put(`${baseUrl}/api/users/set-user-bio`, {
        bio: bio,
        github: github,
        linkedIn: linkedIn,
        twitter: twitter
    }, 
    { withCredentials: true })
        .then((response) => {
            dispatch({
                type: SETUSERBIO,
                payload: response.data
            });
        })
        .catch((error) => {
            const errorMessage = error.response.data.message;
            dispatch({
                type: SETUSERBIOERROR,
                payload: errorMessage
            });
        })
}
