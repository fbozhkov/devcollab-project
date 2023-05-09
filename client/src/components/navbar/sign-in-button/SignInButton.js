import React, { useState } from 'react'
import { Button, StyledEngineProvider } from '@mui/material'
import styles from './sign-in-button.module.scss'
import SignInDialog from '../sign-in-dialog/SignInDialog';

const SignInButton = (props) => {
    const [openSignInDialog, setOpenSignInDialog] = useState(false);

    const handleSignInClickOpen = () => {
        setOpenSignInDialog(true);
    };
    
    return (
        <div>
            <Button className={`${styles.btn} ${props.className}`} onClick={handleSignInClickOpen}> Sign in </Button>
            <SignInDialog open={openSignInDialog} setOpen={setOpenSignInDialog} />
        </div>
        
     
    );
}
export default SignInButton