import React, { useState } from 'react'
import { Redirect, Link } from "react-router-dom";
import { SIGN_IN } from '../reducers/auth';
import { useSelector, useDispatch } from 'react-redux'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
    }

    const createUserWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        // API CALL
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
                    <input type="text" name="email" placeholder="john@gmail.com" onChange={event => onChangeHandler(event)}/>
                </div>
                <div className="box">
                    <div className="label">
                        Password
                    </div>
                    <input type="password" name="password" placeholder="******" onChange={event => onChangeHandler(event)}/>
                </div>
                <div className="box">
                    <div className="label">
                        Your Couple Hashtag #
                    </div>
                    <input type="password" name="password" placeholder="#Virushka" onChange={event => onChangeHandler(event)}/>
                </div>
                <div className="box">
                    <button className="btn" onClick={event => {createUserWithEmailAndPasswordHandler(event, email, password);}}>Sign up</button>
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