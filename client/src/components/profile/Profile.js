import React, {useState, useEffect} from "react";
import { Typography, Avatar } from "@mui/material";
import styles from './profile.module.scss'
import axios from "axios";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChanagePassword";

const baseUrl = process.env.REACT_APP_API;

const Profile = (props) => {
    const [userData, setUserData] = useState({})
    const [dataIsLoaded, setDataIsLoaded] = useState(false)
    const [userAvatar, setUserAvatar] = useState(null)

    useEffect(() => {
        getUserData()
        /* getUserAvatar() */
    }, [])

    const getUserData = async() => {
        try {
            const response = await axios.get(`${baseUrl}/api/users/getUserData`, { withCredentials: true })
            setUserData(response.data);
            getUserAvatar(response.data.id);
        }
        catch(error) {
            window.localStorage.removeItem('uli');
        }
    }

    const getUserAvatar = (id) => {
        
            axios.get(`${baseUrl}/api/users/getUserAvatar/${id}`, { withCredentials: true })
                .then((response) => {
                    setUserAvatar(response.data.avatar_url)   ;             
                })
                .catch((error) => {
                    console.log(error);
                })
        
    }

    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-content']}>
                <div className={styles['profile-heading-div']}>
                    <Avatar className={styles['avatar']} alt="img" src={userAvatar} />
                    <Typography className={styles['profile-heading-text']}> {userData.username}'s Profile</Typography>
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