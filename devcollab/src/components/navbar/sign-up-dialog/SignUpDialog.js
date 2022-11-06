import React from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField
} from '@mui/material'
import styles from './sign-up-dialog.module.scss'

const SignUpDialog = (props) => {

    const handleClose = () => {
        props.setOpen(false);
    }
    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your email, and choose a username and password
                </DialogContentText>
                <div className={styles.form}>
                    <TextField className={styles['form-field']} id="outlined-basic" label="Email" variant="outlined" />
                    <TextField className={styles['form-field']} id="outlined-basic" label="Username" variant="outlined" />
                    <TextField className={styles['form-field']} id="outlined-basic" label="Password" variant="outlined" />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Sign Up</Button>
            </DialogActions>
        </Dialog>
    );
}
export default SignUpDialog