import React, { useState } from 'react'
import { Button, StyledEngineProvider } from '@mui/material'
import styles from './sign-up-button.module.scss'
import SignUpDialog from '../sign-up-dialog/SignUpDialog';

const SignUpButton = () => {
    const [openSignUpDialog, setOpenSignUpDialog] = useState(false);

    const handleSignUpClickOpen = () => {
        setOpenSignUpDialog(true);
    };

    return (
        <StyledEngineProvider injectFirst={true}>
            <div>
                <Button variant='outlined' className={styles.btn} onClick={handleSignUpClickOpen}> Sign up </Button>
                <SignUpDialog open={openSignUpDialog} setOpen={setOpenSignUpDialog} />
            </div>
        </StyledEngineProvider>

    );
}
export default SignUpButton