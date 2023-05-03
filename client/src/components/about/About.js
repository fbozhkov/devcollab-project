import React from 'react'
import styles from './about.module.scss'
import {  Typography } from '@mui/material'


const About = () => {

    return (
        <div className={styles['wrapper']}>
            <div className={styles['about-container']}>
                <div className={styles['about-heading']}>
                    <Typography variant="h2">About</Typography>
                </div>
                <div className={styles['about-content']}>
                    <Typography>
                        DevCollab is a great platform for beginner developers who are looking to create projects for their CVs. The platform is designed to help users find other like-minded individuals to collaborate with on projects. This can be particularly helpful for those who are just starting out in their careers and may not have a large network of contacts yet.

                        By joining DevCollab, users can connect with other developers and UX designers who are also looking to build their portfolios. They can collaborate on projects together, share ideas, and learn from one another. This can be a great way for beginner developers to gain experience and improve their skills.
                    </Typography>
                </div>
            </div>
        </div>
    );
}
export default About