import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography, Chip, Avatar } from "@mui/material";
import styles from './project-card.module.scss' 

const baseUrl = process.env.REACT_APP_API;

const ProjectCard = (props) => {
    const [userAvatar, setUserAvatar] = useState({})
    console.log(props.data)
    useEffect(() => {
        getUserAvatar()
    }, [])

    const getUserAvatar = () => {
        axios.get(`${baseUrl}/api/users/getUserAvatar/${props.data.creator_id}`, { withCredentials: true })
            .then((response) => {
                setUserAvatar(response.data.avatar_url);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    const projectPageLink = {
        pathname:`/project/${props.data.project_id}`
    }
    
    let tags = [];
    for (const tag of props.data.tags) {
        tags.push(Object.values(tag)[0]);
    }
    return(
        <Card className={styles['project-card']}>
            <CardActionArea component={Link} to={projectPageLink}>
                <CardContent>
                    <div className={styles['project-title-div']} >
                        <Typography className={styles['project-title-text']}>
                            {props.data.project_title}
                        </Typography>
                        <Avatar className={styles['avatar']} alt='img' src={userAvatar} />
                    </div>
                    <div className={styles['project-description-div']}>
                        <Typography className={styles['project-description-text']}>
                            {props.data.project_description}
                        </Typography>
                    </div>
                    <div className={styles['project-tags-div']}>
                        {tags.map((tag,index) => {
                            return(
                                <Chip className={styles['tag-chip']} key={index} label={tag} />
                            )
                        })}
                    </div>
                    
                </CardContent>
            </CardActionArea>    
        </Card>
    )
}

export default ProjectCard