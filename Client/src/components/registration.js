import React, { useState } from 'react';
import { useAuth } from '../auth/auth';
import { ErrStatus } from './errStatus';

import { useHistory, Link } from 'react-router-dom';

function Registration() {
  const history = useHistory();
  const auth = useAuth();
  const [status, changeStatus] = useState('ok');
  const handleChange = (event) => {
    console.log(event.target.value)
  }
  async function handleSubmit(event) {
    event.preventDefault();
    //validate input
    //check if email is not in use
    //create user

    let result = await auth.register({ 'email': event.target.email.value, 'password': event.target.password.value, 'city': event.target.city.value, 'state': event.target.state.value, 'name': event.target.name.value });
    /*if (!result) {
      history.replace('/Creatives');
    }*/
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
            <h3 className="mb-4">Registration</h3>
            <form className="mb-3 form-item" onSubmit={handleSubmit}>
              <div className="mb-3 form-item">
                <label htmlFor="InputName" className="form-label">Name</label>
                <input id="name" type="name" className="form-control"/>
              </div>
              <div className="mb-3 form-item">
                <label htmlFor="InputCity" className="form-label">City</label>
                <input id="city" type="city" className="form-control"/>
              </div>
              <div className="mb-3 form-item">
                <label htmlFor="InputState" className="form-label">State</label>
                <input id="state" type="state" className="form-control"/>
              </div>
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
              <p className="form-text">Don't have an account yet? <Link className="highlight" to='/LogIn'>Sign in!</Link></p>
              <ErrStatus/>
            </form>
        </div>
        <button onClick={() => console.log(auth.user)}>get state</button>
        <button onClick={() => { history.replace('/')}}>go home</button>
    </section>
  )
        
}

export default Registration