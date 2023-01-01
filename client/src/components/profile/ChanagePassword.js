import React, { useState, useEffect } from "react";
import { Typography, Paper, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import styles from './profile.module.scss'
import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setnewPasswordError] = useState({ state: false, message: '' });
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [repeatNewPasswordError, setRepeatNewPasswordError] = useState({ state: false, message: '' });
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

    const passwordRegEx = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

    const handlePassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleRepeatPassword = (e) => {
        setRepeatNewPassword(e.target.value);
    }

    const closePasswordChangeSuccess = () => {
        setPasswordChangeSuccess(false)
    }

    const passwordValidation = () => {
        if (passwordRegEx.test(newPassword) === false) {
            setnewPasswordError({ state: true, message: 'Password must contain at least one number and letter be minimum 8 characters long ' })
            return false;
        }
        if (passwordRegEx.test(newPassword)) {
            setnewPasswordError({ state: false, message: '' });
        }
        if (newPassword !== repeatNewPassword) {
            setRepeatNewPasswordError({ state: true, message: 'Passwords must match' })
            return false;
        }
        if (newPassword === repeatNewPassword) {
            setRepeatNewPasswordError({ state: false, message: '' })
        }
        return true;
    }
    
    const submitPassword = (e) => {
        e.preventDefault();
        if (passwordValidation()) {
            axios.put(`${baseUrl}/api/users/changeUserPassword`, {
                password: newPassword
            },
            {withCredentials: true}
            )
            .then((response) => {
                setPasswordChangeSuccess(true);
                e.target.reset();
            })
            .catch((error) => {
                setnewPasswordError({ state: true, message: error.response.data.message });
            })
        }
    }

    return (
        <div>
            <Paper className={styles['password-paper']}>
                <Box component="form" onSubmit={submitPassword}>
                    <Typography>Enter new password</Typography>
                    <TextField
                        hidden type='password'
                        autoComplete="no"
                        error={newPasswordError.state}
                        helperText={newPasswordError.state ? newPasswordError.message : ""}
                        onChange={handlePassword} />
                    <Typography>Repeat new password</Typography>
                    <TextField
                        hidden type='password'
                        autoComplete="no"
                        error={repeatNewPasswordError.state}
                        helperText={repeatNewPasswordError.state ? repeatNewPasswordError.message : ""}
                        onChange={handleRepeatPassword} />
                    <Button type="submit">Save changes</Button>
                    { passwordChangeSuccess ?
                        <Snackbar open={passwordChangeSuccess}
                            autoHideDuration={3000}
                            onClose={closePasswordChangeSuccess}
                        >
                            <Alert variant="filled" severity="success">You have successfully changed your password</Alert>
                        </Snackbar>
                        : null}
                </Box>
            </Paper>
        </div>
    )
}

export default ChangePassword