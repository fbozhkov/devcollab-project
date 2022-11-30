import { React} from "react";
import {
     Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle
} from '@mui/material'
import SignInButton from "../sign-in-button/SignInButton";



const SignUpSuccessDialog = (props) => {
    
    const handleClose = () => {
        props.setOpen(false);
    
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            
            <DialogTitle></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You have successfully signed up!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <SignInButton />
            </DialogActions>
            
        </Dialog>
    );
}
export default SignUpSuccessDialog