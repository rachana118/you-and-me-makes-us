import React, { useState } from 'react'
import { Redirect, Link } from "react-router-dom";
import { SIGN_IN } from '../reducers/auth';
import { useSelector, useDispatch } from 'react-redux'

function Login() {
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

    const loginUserWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        // API CALL
    }

    return (
        <div className="page-center">
        {
           isLogged ? <Redirect to='/' /> : 
           <>
           <h1>Login Page</h1>
            <div className="login">
                <div className="box">
                    <div className="label">
                        Email
                    </div>
                    <input type="text" name="email" onChange={event => onChangeHandler(event)}/>
                </div>
                <div className="box">
                    <div className="label">
                        Password
                    </div>
                    <input type="password" name="password" onChange={event => onChangeHandler(event)}/>
                </div>
                <div className="box">
                    <button className="btn" onClick={event => {loginUserWithEmailAndPasswordHandler(event, email, password);}}>Login</button>
                </div>
                <div className="box">
                    <p>Don't have an account? <Link to='/register'><b>Sign up</b></Link></p>
                </div>
            </div>
           </>
        }
        </div>
    )
}

export default Login;