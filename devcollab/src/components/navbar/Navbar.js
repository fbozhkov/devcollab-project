import React, { useState } from 'react'
import { Button , StyledEngineProvider} from '@mui/material'
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss'
import Logo from '../../devcollab-logo.png'
import SignInButton from './sign-in-button/SignInButton';
import SignUpButton from './sign-up-button/SignUpButton';
import HamburgerMenu from './hamburger-menu/HamburgerMenu';

const Navbar = () => {
    
    return (
        <StyledEngineProvider injectFirst={true}>
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to='/'>
                    <img src={Logo} alt="logo" className={styles.img} />
                </Link>
            </div>
            <div className={styles.navigation}>
                <Button className={styles['nav-btn']}> projects </Button>
                <Button className={styles['nav-btn']}> create </Button>
                <Button className={styles['nav-btn']}> about </Button>
            </div>
            <div className={styles['login-profile']}>
                <SignInButton />
                <SignUpButton />
            </div>
            <div className={styles.hamburger}>
                <HamburgerMenu />
            </div>
        </div>
        </StyledEngineProvider>
    );
}
export default Navbar