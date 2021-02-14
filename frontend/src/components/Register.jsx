import React, { useState } from 'react'
import { Redirect, Link } from "react-router-dom";
import { SIGN_IN } from '../reducers/auth';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hashtag, setHashtag] = useState("");
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "hashtag") {
            setHashtag(value);
        }
    }

    const createUserWithEmailAndPasswordHandler = (event, email, password, hashtag) => {
        event.preventDefault();
        // API CALL
        const user = {
            email,
            password, 
            hashtag
        }
        axios.post("http://localhost:26257/adduser", user).then(async response => {
            const data = response.data;
            console.log(data);
            setEmail('')
            setPassword('')
            setHashtag('')
        })
    }

    return (
        <div className="page-center">
        {
           isLogged ? <Redirect to='/' /> : 
           <>
           <h1>Sign up Page</h1>
            <div className="login">
                <div className="box">
                    <div className="label">
                        Email
                    </div>
                    <input type="text" name="email" placeholder="john@gmail.com" autocomplete="off" onChange={event => onChangeHandler(event)}/>
                </div>
                <div className="box">
                    <div className="label">
                        Password
                    </div>
                    <input type="password" name="password" placeholder="******" autocomplete="off" onChange={event => onChangeHandler(event)}/>
                </div>
                <div className="box">
                    <div className="label">
                        Your Couple Hashtag #
                    </div>
                    <input type="type" name="hashtag" placeholder="#Virushka" autocomplete="off" onChange={event => onChangeHandler(event)}/>
                </div>
                <div className="box">
                    <button className="btn" onClick={event => {createUserWithEmailAndPasswordHandler(event, email, password, hashtag);}}>Sign up</button>
                </div>
                <div className="box">
                    <p>Already have an account? <Link to='/login'><b>Sign In</b></Link></p>
                </div>
            </div>
           </>
        }
        </div>
    )
}

export default Register;