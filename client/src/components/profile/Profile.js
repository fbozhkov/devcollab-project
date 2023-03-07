import React, {useState, useEffect} from "react";
import { Typography, Avatar, Button, TextField, Paper } from "@mui/material";
import styles from './profile.module.scss'
import axios from "axios";
import EditProfileDialog from "../about/EditProfileDialog";

const baseUrl = process.env.REACT_APP_API;

const Profile = (props) => {
    const [userData, setUserData] = useState({})
    const [dataIsLoaded, setDataIsLoaded] = useState(false)
    const [userAvatar, setUserAvatar] = useState(null)
    const [additionalInfo, setAdditionalInfo] = useState({})
    const [openEditProfile, setOpenEditProfile] = useState(false)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async() => {
        try {
            const response = await axios.get(`${baseUrl}/api/users/getUserData`, { withCredentials: true })
            setUserData(response.data);
            getUserAvatar(response.data.id);
            getAdditionalInfo(response.data.id);
        }
        catch(error) {
            window.localStorage.removeItem('uli');
        }
    }

    const getUserAvatar = (id) => {
        axios.get(`${baseUrl}/api/users/getUserAvatar/${id}`, { withCredentials: true })
            .then((response) => {
                setUserAvatar(response.data.avatar_url);
                setDataIsLoaded(true)             
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getAdditionalInfo = (id) => {
        axios.get(`${baseUrl}/api/users/getAdditionalInfo/${id}`)
            .then((response) => {
                setAdditionalInfo(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleEditProfile = () => {
        setOpenEditProfile(true)
    }

    return (
        <div className={styles['profile-page']}>
            {dataIsLoaded ? 
            <div className={styles['card-div']}>
                <Paper className={styles['profile-content']}>
                    <div className={styles['profile-heading-div']}>
                        <div className={styles['avatar-and-username']}>
                            <Avatar className={styles['avatar']} alt="img" src={userAvatar} />
                            <Typography className={styles['profile-heading-text']}> {userData.username}</Typography>
                        </div>
                        <div className={styles['edit-profile-div']}>
                            <div className={styles['edit-profile-button-div']}>
                                <Button onClick={handleEditProfile}>Edit Profile</Button>
                                    <EditProfileDialog data={additionalInfo} open={openEditProfile} setOpen={setOpenEditProfile}/>
                            </div>
                            <div className={styles['edit-profile-info-div']}>
                                <div className={styles['edit-profile-info-bio-div']}>
                                    <Typography className={styles['edit-profile-info-bio-text']}>
                                        {additionalInfo.bio}
                                    </Typography>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </Paper>   
            </div>
                
            : null }
        </div>
    )
}

export default Profile