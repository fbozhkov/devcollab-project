import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../redux/auth';
import { logout } from "../../redux/auth";
import { Button , Menu, MenuItem, IconButton} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss'
import Logo from '../../devcollab-logo.png'
import SignInButton from './sign-in-button/SignInButton';
import SignUpButton from './sign-up-button/SignUpButton';
import HamburgerMenu from './hamburger-menu/HamburgerMenu';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userIsLogged = useSelector(getIsLoggedIn);

    const logOut = () => {
        handleClose();
        dispatch(logout());
        navigate('/');
        window.location.reload(false);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleProfile = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to='/'>
                    <img src={Logo} alt="logo" className={styles.img} />
                </Link>
            </div>
            <div className={styles.navigation}>
                <Button className={styles['nav-btn']} component={Link} to="/projects"> projects </Button>
                <Button className={styles['nav-btn']} component={Link} to="/create-project"> create </Button>
                <Button className={styles['nav-btn']} component={Link} to="/about"> about </Button>
            </div>
            {userIsLogged ? 
                <div className={styles['profile']}>
                    <IconButton onClick={handleProfile} >
                        <AccountCircleIcon className={styles['profile-icon']} />
                    </IconButton>
                    <Menu
                        id='profile-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} component={Link} to='/my-profile'>My Profile</MenuItem>
                        <MenuItem onClick={logOut}>Logout</MenuItem>
                    </Menu>
                </div>
                : 
                <div className={styles['signin-signup']}>
                    <SignInButton />
                    <SignUpButton />
                </div>
            }    
            
            <div className={styles.hamburger}>
                <HamburgerMenu />
            </div>
        </div>
    );
}
export default Navbar