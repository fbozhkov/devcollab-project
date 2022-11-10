import React from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField
} from '@mui/material'
import styles from './sign-in-dialog.module.scss'

const SignInDialog = (props) => {

    const handleClose = () => {
        props.setOpen(false);
    }
    return (
    <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter your email and password
            </DialogContentText>
            <div className={styles.form}>
                <TextField className={styles['form-field']} id="outlined-basic" label="Email" variant="outlined" />
                <TextField className={styles['form-field']} id="outlined-basic" label="Password" variant="outlined" />
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Forgot password?</Button>
                <Button onClick={handleClose}>Sign In</Button>
        </DialogActions>
    </Dialog>
    );
}
export default SignInDialog