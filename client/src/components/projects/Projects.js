import React, { useState, useEffect } from "react";
import { Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import styles from './projects.module.scss'

const baseUrl = process.env.REACT_APP_API;

const Projects = () => {
    const [projects, setProjects] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getAllProjects();
    },[])

    const getAllProjects = () => {
        axios.get(`${baseUrl}/api/projects/get-all-projects`)
            .then((response) => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(`Error fetching data:${error.message}`);
            })
    }
    
    return (
        <div>
            <div className={styles['page-wrapper']}>
                <div className={styles['projects']}>
                    <div>
                        <Typography variant="h2">Projects</Typography>
                    </div>
                    <div>
                        <Typography>
                            Some sorting and filtering bar (filter by tags)
                        </Typography>
                    </div>
                    {loading ?
                        <div className={styles['loading']}>
                            <CircularProgress />
                        </div>
                        : 
                        <div>
                            {Object.values(projects).map((project) => {
                                return (
                                    <ProjectCard key={project.project_id} data={project} />
                                )
                            })}
                        </div>
                    }
                    
                    
                </div>
            </div>
        </div>
        
    )
}

export default Projects