import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../App.css";
const Contact = () => {

    const history = useHistory();
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });
    const contactPage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
            history.push("/login");
        }
    }

    useEffect(() => {
        contactPage();
    }, []);

    //Storing the field data in states
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUserData({ ...userData, [name]: value });
    }
    //sending data to backend
    const contactForm = async (event) => {
        event.preventDefault();
        const { name, email, phone, message } = userData;
        const res = await fetch("/contact", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });
        const data = await res.json();
        if (!data) {
            console.log("message not send");
        }
        else {
            alert("Message Send");
            setUserData({ ...userData, message: "" })
        }
    }



    return (
        <>
            <div className="container">
                <div className="contactus">
                    <h2>Contact Us</h2>
                    <p>Swing by for a cup of coffee, or leave us a message:</p>
                </div>
                <div className="row">
                    <div className="column">
                        <form method="POST">
                            <label for="fname">First Name</label>
                            <input type="text" value={userData.name} onChange={handleChange} id="name" name="name" placeholder="Your name.." autoComplete="off" />
                            <label for="email">Email Id</label>
                            <input type="email" value={userData.email} onChange={handleChange} id="email" name="email" placeholder="Your email id.." autoComplete="off" />
                            <label for="phone">Phone</label>
                            <input type="text" value={userData.phone} onChange={handleChange} id="phone" name="phone" placeholder="Your Phone No.." autoComplete="off" />
                            <label for="subject">Subject</label>
                            <textarea value={userData.message} onChange={handleChange} id="subject" name="message" placeholder="Write something.."></textarea>
                            <input type="submit" value="Submit" onClick={contactForm} />

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
