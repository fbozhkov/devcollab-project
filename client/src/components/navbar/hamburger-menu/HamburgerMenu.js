import React, { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import {
    Button, IconButton, Dialog, DialogContent, Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignInButton from "../sign-in-button/SignInButton";
import SignUpButton from "../sign-up-button/SignUpButton";
import styles from './hamburger-menu.module.scss';

const baseUrl = process.env.REACT_APP_API;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const HamburgerMenu = () => {
    const { user } = useContext(UserContext);

    const [open, setOpen] = React.useState(false);

    const logOut = () => {
        axios.get(`${baseUrl}/api/users/log-out`, { withCredentials: true })
            .then((response) => {
                window.localStorage.removeItem('uli');
            })
            .catch((error) => {
                console.log(error)
            })
        window.location.reload(false);
    }

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
                    <Button className={styles['nav-btn']} component={Link} to="/projects"> projects </Button>
                    <Button className={styles['nav-btn']} component={Link} to="/create-project"> create </Button>
                    <Button className={styles['nav-btn']} component={Link} to="/about"> about </Button>
                    {user ?
                        <div className={styles.content}>                            
                            <Button type='button' component={Link} to='/profile'> Profile</Button>
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
        </div>
    );
}
export default HamburgerMenu

