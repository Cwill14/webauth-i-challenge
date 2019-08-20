import React, { useState } from 'react';
import { axiosWithAuth } from '../axiosAuth';
import { Link } from 'react-router-dom';

const RForm = props => {
    
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

    const register = () => {
        axiosWithAuth().post('http://localhost:8000/api/register', creds)
            .then(res => {
                console.log("register res: ", res);
                props.history.push('/');
            })
            .catch(err => console.log(err))
        setCreds({
            username: '',
            password: ''
        })
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={register}>
                <input 
                    type="username" 
                    placeholder="username" 
                    value={creds.username} 
                    name="username" 
                    // onChange={e => onChange(e)}
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
                <button>Register</button>
            </form>
            <Link to="/"><p>Login</p></Link>
        </div>
    )
}

export default RForm;