import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Dialog, DialogActions, DialogContent, TextField, Typography, Snackbar, Alert} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from './about.module.scss'

const baseUrl = process.env.REACT_APP_API;

const EditProfileDialog = (props) => {
    const [bio, setBio] = useState(props.data.bio);
    const [github, setGithub] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [twitter, setTwitter] = useState('');
    console.log(props.data.bio,bio)

    /* useEffect(() => {},[bio]); */

    const handleClose = () => {
        props.setOpen(false);
    }

    const handleBio = (e) => {
        setBio(e.target.value)
    }
    const handleGithub = (e) => {
        setGithub(e.target.value)
    }
    const handleLinkedIn = (e) => {
        setLinkedIn(e.target.value )
    }
    const handleTwitter = (e) => {
        setTwitter(e.target.value)
    }

    const submitForm = (e) => {
        /* e.preventDefault(); */
        axios.put(`${baseUrl}/api/users/additionalInfo`, {
            bio: bio,
            github: github,
            linkedIn: linkedIn,
            twitter: twitter
        },
        {withCredentials: true})
        console.log('form submited')
    }

    return (
        <Dialog className={styles['dialog']} open={props.open} onClose={handleClose} fullWidth maxWidth='md'>
            <Box component="form" onSubmit={submitForm}>
                <DialogContent>
                    <div className={styles['edit-profile-info-heading-div']}>
                        <Typography className={styles['edit-profile-info-heading-text']}>Bio</Typography>
                    </div>
                    <div className={styles['edit-profile-info-textfield-div']}>
                        <TextField
                            /* placeholder="Add a Bio" */
                            value={bio}
                            fullWidth={true}
                            multiline={true}
                            minRows='3'
                            onChange={handleBio}
                        />
                    </div>
                    <div className={styles['edit-profile-info-links-div']}>
                        <div className={styles['edit-profile-info-icon-textfield']}>
                            <GitHubIcon className={styles['icon']} />
                            <TextField
                                size="small"
                                placeholder="Github"
                                onChange={handleGithub} />
                        </div>
                        <div className={styles['edit-profile-info-icon-textfield']}>
                            <LinkedInIcon className={styles['icon']} />
                            <TextField
                                size="small"
                                placeholder="LinkedIn"
                                onChange={handleLinkedIn} />
                        </div>
                        <div className={styles['edit-profile-info-icon-textfield']}>
                            <TwitterIcon className={styles['icon']} />
                            <TextField
                                size="small"
                                placeholder="Twitter"
                                onChange={handleTwitter} />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default EditProfileDialog