import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText,
     DialogTitle, TextField } from '@mui/material'
import { Link } from 'react-router-dom';
import './navbar.scss'
import Logo from '../../devcollab-logo.png'

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='header'>
            <div className='logo'>
                <Link to='/'>
                    <img src={Logo} alt="logo" className='img' />
                </Link>
            </div>
            <div className='navigation'>
                <Button className='nav-btn'> projects </Button>
                <Button className='nav-btn'> create </Button>
                <Button className='nav-btn'> about </Button>
            </div>
            <div className='login-profile'>
                <Button className='signin-btn' onClick={handleClickOpen} > Sign in </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your email and password
                        </DialogContentText>
                        <div>
                            <TextField id="outlined-basic" label="Email" variant="outlined" />
                            <TextField id="outlined-basic" label="Password" variant="outlined" />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Forgot password?</Button>
                        <Button onClick={handleClose}>Sign In</Button>
                    </DialogActions>
                </Dialog>

                <Button variant='outlined' className='signup-btn'>Sign up</Button>
            </div>
        </div>
    );
}
export default Navbar