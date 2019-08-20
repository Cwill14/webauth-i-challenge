import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../axiosAuth';


const Users = props => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('http://localhost:8000/api/restricted/users')
            .then(res => {
                console.log("Users useEffect res: ", res);
                // setList()
            })
            .catch(err => {
                console.log("Users useEffect err: ", err);
                
            })
      }, [])

    const logout = () => {
        localStorage.removeItem('token');
        // props.history.push('/');
    }

    return (
        <div>
            Users
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Users;