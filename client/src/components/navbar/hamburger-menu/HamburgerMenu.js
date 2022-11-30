import React from "react";
import {
    Button, IconButton, Dialog, DialogContent, Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignInButton from "../sign-in-button/SignInButton";
import SignUpButton from "../sign-up-button/SignUpButton";
import styles from './hamburger-menu.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const HamburgerMenu = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <MenuIcon />
            </IconButton>
            <Dialog
                fullScreen
                className={styles.wrapper}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <DialogContent className={styles.content}>
                    <Button className={styles['nav-btn']}> projects </Button>
                    <Button className={styles['nav-btn']}> create </Button>
                    <Button className={styles['nav-btn']}> about </Button>
                    <div className={styles.sign}>
                        <SignInButton className={styles['sign-in']} />
                        <SignUpButton />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default HamburgerMenu

