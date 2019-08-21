import React, { useState } from 'react';
import { axiosWithAuth } from '../axiosAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = props => {

    const [creds, setCreds] = useState({
        username: '',
        password: ''
    })

    const onChange = e => {
        e.preventDefault();
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }

    const login = e => {
        e.preventDefault();
        axiosWithAuth().post('http://localhost:8000/api/login', creds)
        // axios.post('http://localhost:8000/api/login', creds)
            .then(res => {
                console.log("login res: ", res, '\n', creds);
                localStorage.setItem('token', res.data.token)
                props.history.push('/restricted/users')
            })
            .catch(err => console.log("login err: ", err))
            
        setCreds({
            username: '',
            password: ''
        })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={login}>
                <input
                    type="username"
                    placeholder="username"
                    value={creds.username}
                    name="username"
                    onChange={onChange}
                    autoComplete="off"
                />
                <input
                    type="password"
                    placeholder="password"
                    value={creds.password}
                    name="password"
                    onChange={onChange}
                    autoComplete="off"
                />
                <button>Login</button>
            </form>
            <Link to="/register"><p>Create Account</p></Link>
        </div>
    )
}

export default Login;