import React from "react";
import { Typography, IconButton } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Logo from '../../devcollab-logo.png'
import styles from './footer.module.scss'

const Footer = () => {

    const handleLinkedIn = () => {
        window.open("https://www.linkedin.com/in/filip-bozhkov-27b4361b7", '_blank');
    }

    const handleFacebook = () => {
        window.open("https://www.facebook.com/", '_blank');
    }

    const handleTwitter = () => {
        window.open("https://twitter.com/", '_blank');
    }

    return (
        <div className={styles['footer']}>
            <div className={styles['content']}>
                <div className={styles['items']}>
                    <div className={styles['logo-div']}>
                        <img src={Logo} alt="logo" className={styles.img} />
                    </div>
                    <div className={styles['rights']}>
                        <Typography>Created by Filip Bozhkov</Typography>
                        <Typography>All rights reserved</Typography>
                    </div>
                    <div className={styles['social']}>
                        <IconButton onClick={handleLinkedIn}>
                            <LinkedInIcon className={styles['social-icon']} />
                        </IconButton>
                        <IconButton onClick={handleFacebook}>
                            <FacebookIcon className={styles['social-icon']} />
                        </IconButton>
                        <IconButton onClick={handleTwitter}>
                            <TwitterIcon className={styles['social-icon']} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer