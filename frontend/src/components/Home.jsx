import React from 'react'
import { SIGN_IN, SIGN_OUT } from '../reducers/auth';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)
    const SignOut = () => {
        console.log('Sign Out')
        // API CALL
    }

    return (
        <div className="home">
            {
                isLogged ? 
                <>
                    <h1>Home Page</h1>
                    <button onClick={() => SignOut()}>Logout</button>
                </>
                : <Redirect to='/login' />
            }
        </div>
    )
}

export default Home;