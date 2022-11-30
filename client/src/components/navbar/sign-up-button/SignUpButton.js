import React, { useState, useEffect } from 'react'
import { Button, StyledEngineProvider } from '@mui/material'
import styles from './sign-up-button.module.scss'
import SignUpDialog from '../sign-up-dialog/SignUpDialog';
import SignUpSuccessDialog from '../sign-up-success-dialog/SignUpSuccessDialog';

const SignUpButton = () => {
    const [userIsSignedUp, setUserIsSignedUp] = useState(false);
    const [openSignUpSuccess, setOpenSignUpSuccess] = useState(false);
    const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
    
    const handleSignUpClickOpen = () => {
        setOpenSignUpDialog(true);
    };

    useEffect (() => {
        if(userIsSignedUp){
            setOpenSignUpSuccess(true)
        }
    },[userIsSignedUp])

    return (
        
            <div>
                <Button variant='outlined' className={styles.btn} onClick={handleSignUpClickOpen}> Sign up </Button>
                
                <SignUpDialog 
                    open={openSignUpDialog} 
                    setOpen={setOpenSignUpDialog}
                    signed={userIsSignedUp} 
                    setSigned={setUserIsSignedUp} />
                <SignUpSuccessDialog
                    open={openSignUpSuccess}
                    setOpen={setOpenSignUpSuccess}
                    signUpSetOpen={setOpenSignUpDialog}
                />
            </div>
        

    );
}
export default SignUpButton