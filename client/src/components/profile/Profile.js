import React, {useState, useEffect} from "react";
import { Typography, Paper, TextField, Button } from "@mui/material";
import styles from './profile.module.scss'
import axios from "axios";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChanagePassword";

const baseUrl = process.env.REACT_APP_API;

const Profile = () => {
    const [userName, setUserName] = useState(null)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = () => {
        axios.get(`${baseUrl}/api/users/getUserData`, { withCredentials: true })
            .then((response) => {
                setUserName(response.data.username)
            })
            .catch((error) => {
                window.localStorage.removeItem('uli');
            })
    }

    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-content']}>
                <div className={styles['profile-heading-div']}>
                    <Typography className={styles['profile-heading-text']}> {userName}'s Profile</Typography>
                </div>
                <div className={styles['profile-cards']}>
                    <ChangeEmail />
                    <ChangePassword />
                </div>
                    
            </div>
        </div>
    )
}

export default Profile