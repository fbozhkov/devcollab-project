import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Typography, Chip, CircularProgress } from "@mui/material";
import axios from "axios";
import styles from './project-page.module.scss'

const baseUrl = process.env.REACT_APP_API;

const ProjectPage = () => {
    const id = parseInt(useParams().projectId);
    const [project, setProject] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    
    useEffect(() => {
        getProjectInfo()
    }, [])

    const getProjectInfo = () => {
        axios.get(`${baseUrl}/api/projects/project-info/${id}`)
            .then((response) => {
                setProject(response.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <div className={styles['wrapper']}>
            <Typography variant="h2">
                Project Page
            </Typography>
            { isLoaded ?
            <div className={styles['project']}>
                <div className={styles['project-details-div']}>
                    <div className={styles['project-name-div']}>
                        <Typography variant='h5'>{project.project_title}</Typography>
                    </div>
                    <div className={styles['project-description-div']}>
                        <Typography>{project.project_description}</Typography>
                    </div>
                    <div className={styles['project-tags-div']}>
                        {isLoaded && project && project.tags.map((tagObj, index) => {
                            const tag = Object.values(tagObj.tag)
                            return (
                                <Chip key={index} label={tag} />
                            )
                        })}
                    </div>
                </div>
            </div> :
                <div className={styles['loading']}>
                    <CircularProgress />
                </div>}
            
        </div>
    )
}

export default ProjectPage