import { React, useEffect ,useState } from 'react'
import axios from 'axios'
import './mainpage.scss'
import { getListSubheaderUtilityClass } from '@mui/material';

const Mainpage = () => {
    const [users, setUsers] = useState([]);
    const baseUrl = 'http://localhost:5000';

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        axios.get(`${baseUrl}/api/getAllUsers`)
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
            })
    }

    const deleteUsers = () => {
        axios.delete((`${baseUrl}/api/deleteAllUsers`));
        window.location.reload(false)
    }

    return(
        <div className='main-page'>
            main
            {users?.map((user, id) => (
                <div className='user-log' key={id}>
                    {`userId: ${id} `}
                    {`Email: ${user.email}\t\t`}
                    {/* {`password: ${user.password}\t\t`} */}
                    {`username: ${user.userName}\t\t`}
                </div>
            ))}
            <div>
                <button type="button" onClick={deleteUsers}> Delete users </button>
            </div>
        </div>
    )
}

export default Mainpage