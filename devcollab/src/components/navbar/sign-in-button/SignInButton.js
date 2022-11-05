import React, { useState } from 'react'
import { Button, StyledEngineProvider } from '@mui/material'
import styles from './sign-in-button.module.scss'
import SignInDialog from '../sign-in-dialog/SignInDialog';

const SignInButton = () => {
    const [openSignInDialog, setOpenSignInDialog] = useState(false);

    const handleSignInClickOpen = () => {
        setOpenSignInDialog(true);
    };

    return (
        <StyledEngineProvider injectFirst={true}>
            <div>
                <Button className={styles.btn} onClick={handleSignInClickOpen}> Sign in </Button>
                <SignInDialog open={openSignInDialog} setOpen={setOpenSignInDialog} />
            </div>
        </StyledEngineProvider>
     
    );
}
export default SignInButton