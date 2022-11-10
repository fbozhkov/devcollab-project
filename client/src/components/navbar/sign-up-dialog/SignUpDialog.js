import { React, useState, useEffect } from "react";
import axios from "axios";
import {
    Button, Box, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField
} from '@mui/material'
import styles from './sign-up-dialog.module.scss'

const baseUrl = 'http://localhost:5000';

const SignUpDialog = (props) => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');

    const emailRegEx = (/\S+@\S+\.\S+/);
    const passwordRegEx = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    const userNameRegEx = (/\w{4,30}$/);

    const handleClose = () => {
        props.setOpen(false);
        setEmail('');
        setEmailError(false);
        setPassword('');
        setPasswordError(false);
        setRepeatPassword('');
        setRepeatPasswordError(false);
        setUserName('');
        setUserNameError(false);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleUserName = (e) => {
        setUserName(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    }

    const formValidation = () => {
        if (emailRegEx.test(email) === false) {
            setEmailError(true);
            return false;
        }
        if (emailRegEx.test(email)) {
            setEmailError(false);
        }
        if (passwordRegEx.test(password) === false) {
            setPasswordError(true);
            return false;
        }
        if (passwordRegEx.test(password)) {
            setPasswordError(false);
        }
        if (password !== repeatPassword) {
            setRepeatPasswordError(true);
            return false;
        }
        if (password === repeatPassword) {
            setRepeatPasswordError(false);
        }
        if (userNameRegEx.test(userName) === false) {
            console.warn('username error')
            setUserNameError(true);
            return false;
        }
        if (userNameRegEx.test(userName)) {
            console.log('no username error')
            setUserNameError(false);
        }
        return true;
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (formValidation()) {
            console.log('form is valid')
            axios.post(`${baseUrl}/api/sign-up`, {
                email: email,
                password: password,
                userName: userName
            });
            window.location.reload(false)
        }
        else {
            console.log('form is INVALID')
            return false;
        }
    }
    return (
        <Dialog open={props.open} onClose={handleClose}>
            <Box component="form" onSubmit={submitForm}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your email, and choose a username and password
                    </DialogContentText>
                    <Box className={styles.form}>
                        <TextField className={styles['form-field']}
                            type='email'
                            required
                            autoComplete="email"
                            label="Email" 
                            variant="outlined"
                            error = {emailError}
                            helperText= {emailError ? "Invalid email" : ""}
                            onChange={handleEmail} />
                        <TextField className={styles['form-field']}
                            hidden type='password'
                            required
                            autoComplete="new-password"
                            label="Password"
                            variant="outlined"
                            error={passwordError}
                            helperText={passwordError ? "Password must contain at least one number and letter be minimum 8 characters long " : ""}
                            onChange={handlePassword} />
                        <TextField className={styles['form-field']}
                            hidden type='password'
                            required
                            autoComplete="off"
                            label="Repeat password"
                            variant="outlined"
                            error = {repeatPasswordError}
                            helperText = {repeatPasswordError ? "Passwords must match" : ""}
                            onChange={handleRepeatPassword} />
                        <TextField className={styles['form-field']} 
                            type='text' 
                            required
                            autoComplete="off"
                            label="Username" 
                            variant="outlined"
                            error={userNameError}
                            helperText={userNameError ? "Username must be between 4 and 30 characters long and contain only alphanumeric values " : ""}
                            onChange={handleUserName}/>
                        
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Sign Up</Button>
                </DialogActions>
            </Box>
            
        </Dialog>
    );
}
export default SignUpDialog