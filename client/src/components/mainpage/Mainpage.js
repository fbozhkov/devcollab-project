import { React, useEffect , useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { Button, Typography } from '@mui/material';
import axios from 'axios'
import styles from './mainpage.module.scss';
import Projects from '../projects/Projects';
import CreateProject from '../create-project/CreateProject';

const Mainpage = () => {
    const { setUser } = useContext(UserContext);

    const baseUrl = process.env.REACT_APP_API;

    return(
        <div className={styles['main-page']}>
            <div className={styles['wrapper']}> 
                 <div className={styles.intro}>
                    <Typography variant='h2'>Are you looking for fellow developers to collaborate on your project?</Typography>
                    <Button className={styles.header} component={Link} to="/projects"> Post your project idea </Button>
                    <Typography variant='h2'>Are you looking for an interesting project to put your knowledge into practice?</Typography>
                    <Button className={styles.header} component={Link} to="/create-project"> Check available projects </Button>
                </div>
            </div>
        </div>
    )
}

export default Mainpage