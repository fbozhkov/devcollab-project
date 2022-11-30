import React, {useState, useEffect} from "react";
import { Typography } from "@mui/material";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

const Profile = () => {
    const [username, setUsername] = useState(null)

    useEffect(() => {
        getUserData()
    }, [])

    
    const getUserData = () => {
        axios.get(`${baseUrl}/api/users/getUserData`, { withCredentials: true })
            .then((response) => {
                setUsername(response.data.username)
            })
            .catch((error) => {
                window.localStorage.removeItem('uli');
            })
    }
    

    return(
        <div>
            <Typography variant="h2">Hello {username}!</Typography>
        </div>
    )
}

export default Profile