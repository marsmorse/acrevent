import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth, useProvideAuth } from '../auth/auth';

import { ErrStatus } from './errStatus';

function LogIn() {
    let auth = useAuth();

    const handleChange = (event) => {
        console.log(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // authenticate

        //update react state to reflect the authentication

        //route to the user's events page

        console.log(event.target.password.value);
        console.log(event.target.email.value);
        auth.signin(event.target.email.value, event.target.password.value);
    }

    return(
        <section>
            <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                    <path d="M43.4797 0H20.0859C8.9929 0 0.000265564 8.99264 0.000265564 20.0856L0 69.0736C11.093 69.0736 43.4797 11.093 43.4797 0Z" fill="#8EC6B8"/>
                    <path d="M86.1827 67.1111L81.3567 2.61499C70.2638 2.61499 29.5103 56.0181 29.5103 67.1111V96.6488C40.6032 96.6488 86.1827 78.2041 86.1827 67.1111Z" fill="#1C2F42"/>
                </g>
                <defs>
                    <clipPath id="clip0">
                    <rect width="69" height="69" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
            <div className="mt-4 form-cont">
                <h3 className="mb-4">Sign in</h3>
                <form className="mb-3 form-item" onSubmit={handleSubmit}>
                  <div className="mb-3 form-item">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input id="email" type="email" className="form-control"  aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3 form-item">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input id="password" type="password" className="form-control"/>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3 mb-2">Submit</button>
                  <p className="form-text">Don't have an account yet? <Link className="highlight" to='/Registration' >Register!</Link></p>
                </form>
                <ErrStatus/>
            </div>
            <button onClick={() => {console.log(auth.error);console.log(auth.user);}}>get state</button>
        </section>
    )

        
}

export default LogIn;