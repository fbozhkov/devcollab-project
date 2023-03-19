import { React } from 'react'
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import styles from './mainpage.module.scss';

const Mainpage = () => {
    
    return(
        <div className={styles['main-page']}>
            
            <div className={styles['wrapper']}> 
                
                    <div className={styles['create-projects-div']}>
                        <div className={styles['ellipse-gradient']} />
                        <div className={styles['cubes-create-projects']}>
                            <div className={styles['create-projects-content']}>
                                <div className={styles['create-projects-small-heading-div']}>
                                    <Typography className={styles['create-projects-small-heading-font']}> The future belongs to teamwork</Typography>
                                </div>
                                <div className={styles['create-projects-heading-div']}>
                                    <Typography className={styles['create-projects-heading-font']}>Are you looking for fellow developers to collaborate on your project?</Typography>
                                </div>
                                <div className={styles['create-projects-button-div']}>
                                    <Button 
                                        className={styles['create-projects-button']}
                                        component={Link} to="/create-project"
                                        variant='contained'> Post your project idea </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['projects-div']}>
                        <div className={styles['cubes-projects']}>
                            <div className={styles['projects-content']}>
                                <div className={styles['project-heading-div']}>
                                    <Typography className={styles['projects-heading-font']}>Are you looking for an interesting project to put your knowledge into practice?</Typography>
                                </div>
                                <div className={styles['projects-button-div']}>
                                    <Button className={styles['projects-button']}
                                        component={Link} to="/projects"
                                        variant='contained'> Check available projects </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}

export default Mainpage