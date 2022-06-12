import React, { useState } from 'react';
import "../App.css";
import Imgavatar from "../images/img_avatar2.png";
import { useHistory } from "react-router-dom";
const Login = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (event) => {
        event.preventDefault();
        const res = await fetch("/signin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = res.json();
        if (data.status === 400 || !data) {
            window.alert("Invalid Credentials");
            console.log("Invalid Credentials");
        } else {
            window.alert("Login Sucessfull");
            console.log("Login Sucessfull");
            history.push("/");
        }
    }
    return (
        <>


            <div className="imgcontainer">
                <img src={Imgavatar} alt="Avatar" className="avatar" />
            </div>
            <h2>Login Form</h2>
            <form method="POST">
                <div className="container">
                    <label for="email"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email" autoComplete="off" value={email} onChange={(event) => { setEmail(event.target.value) }} />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" autoComplete="off" value={password} onChange={(event) => { setPassword(event.target.value) }} />

                    <button type="submit" onClick={loginUser}>Login</button>
                    <label>
                        <input type="checkbox" name="remember" /> Remember me
                    </label>
                </div>

                <div className="container" >
                    <button type="button" className="cancelbtn" >Cancel</button>
                </div>
            </form>
        </>
    )
}

export default Login
