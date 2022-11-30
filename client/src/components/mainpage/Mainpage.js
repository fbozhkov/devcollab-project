import { React, useEffect ,useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import './mainpage.scss'

const Mainpage = () => {
    const [users, setUsers] = useState([]);
    const baseUrl = process.env.REACT_APP_API;

    const columns = [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'username', headerName: 'Username', width: 120 },

    ]

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        axios.get(`${baseUrl}/api/users/getAllUsers`)
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
            })
    }

    const deleteUsers = () => {
        axios.delete(`${baseUrl}/api/users/deleteAllUsers`);
        window.location.reload(false)
    }

    return(
        <div className='main-page'>
            main
            <div className='table'>
                <DataGrid
                    rows={users?.map((user) => (
                        {
                        id: user.id,
                        email: user.email,
                        username: user.username
                        }                    
                    ))}
                    columns={columns}
                    pageSize={10}
                    autoHeight
                    
                />
            </div>

            <div>
                <button type="button" onClick={deleteUsers}> Delete users </button>
            </div>
        </div>
    )
}

export default Mainpage