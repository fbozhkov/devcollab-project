import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './create-project.module.scss';
import { Typography, TextField, Stack, Autocomplete, Chip, Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../utils/apiBaseUrl"
import Protected from "../protected/Protected";

console.warn(`baseUrl: ${baseUrl}`)
const techStack = ['java', 'javascript', 'react', 'node.js', 'python'];
const CreateProject = () => {
    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectTags, setProjectTags] = useState([])

    const navigate = useNavigate();

    useEffect(() => {   
        validateUser();
    }, [])

    const validateUser = () => {
        axios.get(`${baseUrl}/api/users/validateUser`, { withCredentials: true })
            .then((response) => {
                console.log(`status:${response.status}`)
                setUserLoggedIn(response.data.success);
                setLoading(false);
            })
            .catch((error) => {
                console.log(`error response:${error.response.data}`)
                setUserLoggedIn(false);
                setLoading(false);
            })
    }

    const handleProjectName = (e) => {
        setProjectName(e.target.value);
    }

    const handleProjectDescription = (e) => {
        setProjectDescription(e.target.value);
    }

    const handleProjectTags = (event, value) => {
        setProjectTags(value)
    }
    
    const submitProject = async (e) => {
        e.preventDefault();
        setPostLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/projects/post-project`, {
                projectName: projectName,
                projectDescription: projectDescription,
                projectTags: projectTags
            },
            { withCredentials: true })
            setPostLoading(false);
            navigate(`/project/${response.data.project_id}`);
        }
        catch(error) {
            console.log(`error response:${error.response.data}`)
            setPostLoading(false);
        }
    }

    return (
        <div>
            <div className={styles['wrapper']}>
                <Typography variant="h2">Create Project</Typography>
                    {loading ? <div>Loading...</div> :    
                        userLoggedIn ? 
                            <div className={styles['create-project']}>
                            <Box component="form" onSubmit={submitProject}>
                                <div className={styles['input-fields-div']}>
                                    <div className={styles['project-name-div']}>
                                        <TextField 
                                            fullWidth={true}
                                            type='text'
                                            required
                                            autoComplete="off"
                                            label='Project name'
                                            variant='outlined'
                                            onChange={handleProjectName}
                                        />
                                    </div>
                                    <div className={styles['project-description-div']}>
                                        <TextField
                                            fullWidth={true}
                                            type='text'
                                            required
                                            autoComplete="off"
                                            label='Project description'
                                            variant='outlined'
                                            multiline={true}
                                            minRows='6'
                                            onChange={handleProjectDescription}
                                        />
                                    </div>
                                    <div className={styles['project-tags-div']}>
                                        <Autocomplete
                                            multiple
                                            id="tags-filled"
                                            options={techStack}
                                            freeSolo={true}
                                            onChange={handleProjectTags}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                ))
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label="Tags"
                                                    placeholder="Favorites"
                                                />
                                            )}
                                        />
                                    </div>
                                    {postLoading ? <CircularProgress /> 
                                        : 
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >Post Project</Button>}
                                </div>
                            </Box>
                            </div>
                        : <div className={styles['protected']}> <Protected /> </div>
                    }
            </div>
        </div>
    )
}

export default CreateProject