import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../axiosAuth';
import axios from 'axios';


const Users = props => {

    const [list, setList] = useState([]);
    const [loggingOut, setLoggingOut] = useState(false);
    const [farewell, setFarewell] = useState('')

    useEffect(() => {
        axiosWithAuth().get('http://localhost:8000/api/restricted/users', {
            sessions: {
                loggedIn: true
            }
        })
        // axios.get('http://localhost:8000/api/restricted/users')
            .then(res => {
                console.log("Users useEffect res: ", res);
                // setList()
            })
            .catch(err => {
                console.log("Users useEffect err: ", err);
                
            })
      }, [])

    const logout = () => {
        axiosWithAuth().get('http://localhost:8000/api/logout')
            .then(res => {
                setFarewell(res.data.message)
                setLoggingOut(true);
                localStorage.removeItem('token');
                setTimeout(() => props.history.push('/'), 1500);
                // props.history.push('/');
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            Users
            { loggingOut && <h3>{`${farewell}!`}</h3>}
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Users;