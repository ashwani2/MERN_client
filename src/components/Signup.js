import React, { useState } from 'react'
import "../App.css";
import { NavLink, useHistory } from 'react-router-dom';

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    let name, value;
    const handleChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setUser({ ...user, [name]: value });
    }

    const PostData = async (event) => {
        event.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;
        const res = await fetch("/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
                //above line can be written as
                //name:name,email:email,phone:phone,work:work,password:password,cpassword:cpassword
            })
        });
        const data = await res.json();
        if (data.status === 422 || !data) {
            window.alert("Invalid Registeration!");
            console.log("Invalid Regsiteration!");
        } else {
            window.alert("Sucessfull Registeration!");
            console.log("Successfull Regsiteration!");
            history.push("/signin");
        }
    }



    return (
        <>
            <form method="POST">
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <label for="Name"><b>Name</b></label>
                    <input type="text" placeholder="Enter name" name="name" id="name" autoComplete="off" value={user.name} onChange={handleChange} />

                    <label for="email"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email" id="email" autoComplete="off" value={user.email} onChange={handleChange} />

                    <label for="phone"><b>Phone</b></label>
                    <input type="text" placeholder="Enter Phone" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleChange} />

                    <label for="psw"><b>Profession</b></label>
                    <input type="text" placeholder="Enter Profession" name="work" id="work" autoComplete="off" value={user.work} onChange={handleChange} />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleChange} />

                    <label for="psw-repeat"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword} onChange={handleChange} />
                    <hr />

                    <p>By creating an account you agree to our <NavLink to="#">Terms & Privacy</NavLink>.</p>
                    <button type="submit" className="registerbtn" onClick={PostData}>Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <NavLink to="/login">Sign in</NavLink>.</p>
                </div>
            </form>
        </>
    )
}

export default Signup
