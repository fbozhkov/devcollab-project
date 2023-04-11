import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, getUsername } from "../../redux/auth/selectors";
import { getUserAvatarSelector, getUserBioSelector } from "../../redux/my-profile";
import { getUserAvatar, getUserBio } from "../../redux/my-profile";
import { Typography, Avatar, Button, Paper, CircularProgress, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from './profile.module.scss';
import EditProfileDialog from "../about/EditProfileDialog";

const Profile = () => {
    const [dataIsLoaded, setDataIsLoaded] = useState(false)
    const [openEditProfile, setOpenEditProfile] = useState(false)
    
    const dispatch = useDispatch()
    const userId = useSelector(getUserId)
    const userName = useSelector(getUsername)
    const userAvatar = useSelector(getUserAvatarSelector)
    const userBio = useSelector(getUserBioSelector)

    useEffect(() => {
        profileApiCall();
    }, [])

    const profileApiCall = async () => {
        await Promise.all([dispatch(getUserAvatar(userId)), dispatch(getUserBio(userId))]);
        console.log('Updated userAvatar:', userAvatar);
        console.log('Updated userBio:', userBio);
        setDataIsLoaded(true);
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
                            <Typography className={styles['profile-heading-text']}> {userName}</Typography>
                            <div className={styles['social-media-div']}>
                                <IconButton className={styles['social-media-icon']} href={userBio.github} target="_blank">
                                    <GitHubIcon />
                                </IconButton>
                                <IconButton className={styles['social-media-icon']} href={userBio.linkedIn} target="_blank">
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton className={styles['social-media-icon']} href={userBio.twitter} target="_blank">
                                    <TwitterIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className={styles['edit-profile-div']}>
                            <div className={styles['edit-profile-button-div']}>
                                <Button onClick={handleEditProfile}>Edit Profile</Button>
                                    <EditProfileDialog open={openEditProfile} setOpen={setOpenEditProfile}/>
                            </div>
                            <div className={styles['edit-profile-info-div']}>
                                <div className={styles['edit-profile-info-bio-div']}>
                                    <Typography className={styles['edit-profile-info-bio-text']}>
                                        {userBio.bio}
                                    </Typography>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </Paper>   
            </div>
                
            : 
            <div className={styles['loading-div']}>
                <CircularProgress />
            </div> }
        </div>
    )
}

export default Profile

