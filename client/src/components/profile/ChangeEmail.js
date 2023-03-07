import React, { useState, useEffect } from "react";
import { Typography, Paper, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import styles from './profile.module.scss'
import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

const ChangeEmail = () => {
    const [userEmail, setUserEmail] = useState('')
    const [emailError, setEmailError] = useState({ state: false, message: '' });
    const [emailChangeSuccess, setEmailChanageSuccess] = useState(false)

    const emailRegEx = (/\S+@\S+\.\S+/);

    useEffect(() => {
        getUserData()
    }, [])

    const handleEmail = (e) => {
        setUserEmail(e.target.value);
    }

    const closeEmailChangeSuccess = () => {
        setEmailChanageSuccess(false)
    }

    const getUserData = () => {
        axios.get(`${baseUrl}/api/users/getUserData`, { withCredentials: true })
            .then((response) => {
                setUserEmail(response.data.email)
            })
            .catch((error) => {
                window.localStorage.removeItem('uli');
            })
    }

    const emailValidation = () => {
        if (emailRegEx.test(userEmail) === false) {
            setEmailError({ state: true, message: 'Invalid email' });
            return false;
        }
        if (emailRegEx.test(userEmail)) {
            setEmailError({ state: false, message: '' });
        }
        return true;
    }

    const submitEmail = (e) => {
        e.preventDefault();
        if (emailValidation()) {
            axios.put(`${baseUrl}/api/users/chageUserEmail`, {
                email: userEmail
            },  
            { withCredentials: true })
            .then((response) => {
                setEmailChanageSuccess(true);
            })
            .catch((error) => {
                setEmailError({ state: true, message: error.response.data.message});
            })
        }
    }

    return(
        <div>
            <Paper className={styles['email-paper']}>
                <Box component="form" onSubmit={submitEmail}>
                    <Typography>Edit profile information</Typography>
                    <Typography>Profile Picture</Typography>

                    <Typography>Email</Typography>
                    <TextField
                        required={true}
                        value={userEmail}
                        error={emailError.state}
                        helperText={emailError.state ? emailError.message : ''}
                        onChange={handleEmail} />
                    <Button type="submit">Save changes</Button>
                    {emailChangeSuccess ?
                        <Snackbar open={emailChangeSuccess}
                            autoHideDuration={3000}
                            onClose={closeEmailChangeSuccess}
                        >
                            <Alert variant="filled" severity="success">You have successfully changed your email</Alert>
                        </Snackbar>
                        : null}
                </Box>
            </Paper>
        </div>
    )
}

export default ChangeEmail