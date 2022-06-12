import React, { useEffect, useState } from 'react'
import "../App.css";
import { useHistory } from 'react-router-dom';
const Home = () => {

    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);
    const homePage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);


        } catch (error) {
            console.log(error);
            history.push("/login");
        }
    }

    useEffect(() => {
        homePage();
    }, []);


    return (
        <>
            <div className="Home-bg">
                <h1 className="desc">
                    <p>Welcome</p>
                    <h1>{userName}</h1>
                    {show ? 'Happy to see You back' : 'We are the mern Developer'}
                </h1>
            </div>
        </>
    )
}

export default Home;
