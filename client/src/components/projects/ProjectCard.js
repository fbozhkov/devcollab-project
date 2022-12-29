import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography, Chip } from "@mui/material";
import styles from './project-card.module.scss' 

const ProjectCard = (props) => {
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
                        <Typography>
                            user:{props.data.creator_id}
                        </Typography>
                    </div>
                    <div className={styles['project-description-div']}>
                        <Typography className={styles['project-description-text']}>
                            {props.data.project_description}
                        </Typography>
                    </div>
                    <div className={styles['project-tags-div']}>
                        {tags.map((tag,index) => {
                            return(
                                <Chip key={index} label={tag} />
                            )
                        })}
                    </div>
                    
                </CardContent>
            </CardActionArea>    
        </Card>
    )
}

export default ProjectCard