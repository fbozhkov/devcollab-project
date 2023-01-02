import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { Button , Menu, MenuItem, IconButton} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss'
import Logo from '../../devcollab-logo.png'
import SignInButton from './sign-in-button/SignInButton';
import SignUpButton from './sign-up-button/SignUpButton';
import HamburgerMenu from './hamburger-menu/HamburgerMenu';

const baseUrl = process.env.REACT_APP_API;

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const data = window.localStorage.getItem('uli')
        setUser(data)
        validateUser(data)
    }, [])

    const validateUser = (localStorageData) => {
        
            axios.get(`${baseUrl}/api/users/validateUser`, { withCredentials: true })
                .then((response) => {
                    window.localStorage.setItem('uli', 1);
                    setUser(1)
                })
                .catch((error) => {
                    if (localStorageData) {
                        window.localStorage.removeItem('uli');
                        setTimeout(() => {
                            window.location.reload(false);
                        }, 300)
                    }
                })

    }

    const logOut = async () => {
        try {
            handleClose();
            await axios.get(`${baseUrl}/api/users/log-out`, { withCredentials: true });
            window.localStorage.removeItem('uli');
            navigate('/');
            window.location.reload(false);
        }
        catch(error) {
            console.log(error)
        }
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
            {user ? 
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