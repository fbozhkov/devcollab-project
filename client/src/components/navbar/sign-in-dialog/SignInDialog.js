import { React, useState, useEffect ,useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import {
    Button, Box, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField, Typography
} from '@mui/material'
import styles from './sign-in-dialog.module.scss'
import { HamburgerContext } from "../../../contexts/HamburgerContext";

const baseUrl = process.env.REACT_APP_API;

const SignInDialog = (props) => {
    const { setUser } = useContext(UserContext);
    const { setOpen } = useContext(HamburgerContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpError, setSignUpError] = useState({errorState: false, errorMessage:''});
    const [signUpEmailError, setSignUpEmailError] = useState({ errorState: false, errorMessage: '' });
    const [signUpPasswordError, setSignUpPasswordError] = useState({ errorState: false, errorMessage: '' });

    const handleClose = () => {
        props.setOpen(false);
        setSignUpError({errorState: false, errorMessage:''})
        setSignUpEmailError({ errorState: false, errorMessage: '' })
        setSignUpPasswordError({ errorState: false, errorMessage: '' })
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/api/users/sign-in`, {
            email: email,
            password: password
        },
        {withCredentials: true})
        .then((response) => {
            console.log('>>>>>>>setUser 3')
            
            const userIsLogged = JSON.stringify(response.data?.success)
            console.log(userIsLogged)
            props.setOpen(false);
            setUser(userIsLogged);
            setOpen(false);
            window.localStorage.setItem('uli', userIsLogged);
        })
        .catch((error) => {
            console.log(error.response.data)
            if (error.response.data.errorOrigin === 'email') {
                setSignUpEmailError({ errorState: true, errorMessage: error.response.data.message })
            }
            else if (error.response.data.errorOrigin === 'password') {
                setSignUpPasswordError({ errorState: true, errorMessage: error.response.data.message })
            }
            else {
                setSignUpError({ errorState: true, errorMessage: error.response.data.message})
            }
        })
    }

    return (
    <Dialog open={props.open} onClose={handleClose} maxWidth='lg'>
        <Box component="form" onSubmit={submitForm}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your email and password if you have an account
                </DialogContentText>
                <div className={styles.form}>
                    <TextField className={styles['form-field']} 
                        type='email'
                        required
                        autoComplete="email"
                        label="Email"
                        variant="outlined"
                        error={signUpEmailError.errorState}
                        helperText={signUpEmailError.errorState ? signUpEmailError.errorMessage : ""}
                        onChange={handleEmail} />
                    <TextField className={styles['form-field']} 
                        hidden type='password'
                        required
                        autoComplete="new-password"
                        label="Password"
                        variant="outlined"
                        error={signUpPasswordError.errorState}
                        helperText={signUpPasswordError.errorState ? signUpPasswordError.errorMessage : ""}
                        onChange={handlePassword} />
                    {signUpError.errorState ? 
                        <Typography>{signUpError.message}</Typography>
                        : 
                        null
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <Button type="submit">Sign In</Button>
            </DialogActions>
        </Box>
    </Dialog>
    );
}
export default SignInDialog