import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

const API = process.env.REACT_APP_API;
const cookies = new Cookies();

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await res.json();
        console.log(data);
        if(data.session){
            cookies.set('session', data.session, {path: "/", sameSite: 'strict' })
            alert("Welcome "+data.session)
            window.location.href="./Search";
        }else{
            alert(data.error)
        }
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/login`)
        const data = await res.json();
        console.log(data)

    }
    useEffect(() => {
        getUsers();
    }, [])


    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="text-white card card-body bg-dark">
                    <img src="https://whaleandjaguar.co/assets/img/gifs/InicioW&J.gif" width='180px' height='180px' alt="logo" className="align-self-center"/>
                    <label for="username">Username</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        autoFocus
                    />
                    <label for="password">Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        className="form-control"
                        placeholder="Password"
                    />
                    <button className="btn btn-primary">Log in</button>
                </form>
            </div>
        </div>
    )
}