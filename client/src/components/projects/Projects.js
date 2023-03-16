import React, { useState, useEffect } from "react";
import { Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import Filter from "./Filter";
import styles from './projects.module.scss'

const baseUrl = process.env.REACT_APP_API;

const Projects = () => {
    const [projects, setProjects] = useState('');
    const [filteredProjects, setFilteredProjects] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);

    const filter = useSelector((state) => state.filter.filter);

    useEffect(() => {
        getAllProjects();
        filterProjects();
    },[filter])

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

    const filterProjects = () => {
        if (!projects) return;
        setNoResults(false);
        if (filter === 'all') {
            setFilteredProjects(projects);
        } else {
            console.log(projects)
            const filtered = projects.filter((project) => {
                return project.tags.some((tag) => {
                    return tag.tag === filter;
                })
            })
            console.log(filtered)
            if (filtered.length === 0) {
                setNoResults(true);
            }
            setFilteredProjects(filtered);
        }
    }
    
    return (
        <div>
            <div className={styles['page-wrapper']}>
                <div className={styles['projects']}>
                    <div>
                        <Typography variant="h2">Projects</Typography>
                    </div>
                    <div>
                        <Filter />
                    </div>
                    {loading ?
                        <div className={styles['loading']}>
                            <CircularProgress />
                        </div>
                        : 
                        noResults ?
                            <div className={styles['no-results']}>
                                <Typography variant="h4">No results found</Typography>
                            </div>
                            :
                            <div>
                                {Object.values(filteredProjects).map((project) => {
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