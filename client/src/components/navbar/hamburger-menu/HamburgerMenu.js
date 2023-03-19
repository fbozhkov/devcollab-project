import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../../redux/auth';
import { logout } from '../../../redux/auth';
import { HamburgerContext } from '../../../contexts/HamburgerContext';
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
    const dispatch = useDispatch();
    const userIsLogged = useSelector(getIsLoggedIn);

    const [open, setOpen] = React.useState(false);

    let navigate = useNavigate();

    const projectsRoute = () => {
        let path = `/projects`;
        navigate(path);
        setOpen(false);
    }

    const createProjectRoute = () => {
        let path = `/create-project`;
        navigate(path);
        setOpen(false);
    }

    const aboutRoute = () => {
        let path = `/about`;
        navigate(path);
        setOpen(false);
    }

    const profileRoute = () => {
        let path = `/my-profile`;
        navigate(path);
        setOpen(false);
    }

    const logOut = () => {
        dispatch(logout());
        setTimeout(() => {
            window.location.reload(false);
        }, 300)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <HamburgerContext.Provider value={{ open, setOpen }}>
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
                    <Button className={styles['nav-btn']} onClick={projectsRoute}> projects </Button>
                    <Button className={styles['nav-btn']} onClick={createProjectRoute}> create </Button>
                    <Button className={styles['nav-btn']} onClick={aboutRoute}> about </Button>
                    {userIsLogged ?
                        <div className={styles.content}>                            
                            <Button type='button' onClick={profileRoute}> Profile</Button>
                            <Button type='button' onClick={logOut}>Log out</Button>
                        </div>
                        :
                        <div className={styles.sign}>
                            <SignInButton className={styles['sign-in']} />
                            <SignUpButton />
                        </div>
                    }
                </DialogContent>
            </Dialog>
            </HamburgerContext.Provider> 
        </div>
    );
}
export default HamburgerMenu

