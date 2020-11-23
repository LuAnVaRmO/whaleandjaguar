import React, { useState } from "react";

const API = process.env.REACT_APP_API;

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API}/register`, {
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
        console.log(data)
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="text-white card card-body bg-dark">
                    <img src="https://www.pinclipart.com/picdir/big/10-104265_create-icon-from-png-online-create-account-icon.png" width='180px' height='180px'
                         alt="logo" className="align-self-center"/>
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
                        className="form-control"
                        id="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-primary btn-block">Register</button>
                </form>
            </div>
        </div>
    )
}