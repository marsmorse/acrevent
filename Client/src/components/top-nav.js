import { useAuth } from '../auth/auth';
import '../styles/homepage.css';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import AcreventLogo from '../logo.svg';

function ProfileDropdown() {
    let auth = useAuth();
    console.log(auth.user);
    console.log(auth.user.profile.name);

    return(
        <div className="dropdown">
            <a className="dropdown-toggle" href="#" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><span className="caret"></span></a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><h3 className="dropdown-item bold">{auth.user.profile.name}</h3></li>
                <li><a className="dropdown-item dropdown-link" href="#">Sign Out</a></li>
                <li><a className="dropdown-item dropdown-link" href="#">Reset Password</a></li>
                <li><a className="dropdown-item dropdown-link" href="#">Delete Account</a></li>
            </ul>
        </div>
    )
}
function TopNav() {
    let auth = useAuth();
    let location = useLocation();
    console.log(location)
    let links = ['Events', 'Creatives'];

    if ( auth.user.isAuthenticated === false) {
        return(
            <div className="top-nav-cont">
                <div></div>
                <div className="top-nav-center">
                    <img src={AcreventLogo} alt='Acrevent logo'></img>
                    <h1 className='logo-heading'>Acrevent</h1>
                </div>
                <div className="top-nav-right">
                    <Link className='nav-link text-nowrap' to='/LogIn'>Sign In</Link>
                    <Link className='nav-link text-nowrap' to='/Registration'>Register</Link>
                </div>
            </div>
        )
    } else {

        return(
            <div className="top-nav-cont">
                <div></div>
                <div className="top-nav-center">
                    <img src={AcreventLogo} alt='Acrevent logo'></img>
                    <h1 className='logo-heading'>Acrevent</h1>
                </div>
                <div className="top-nav-right">
                    {
                        links.map( (link, index) => {
                            return ((location.pathname === ('/' + link)) ?
                                null : <Link key={index} className='nav-link text-nowrap' to={`/${link}`}>{link}</Link>
                            )
                        })
                    }
                    <ProfileDropdown/>
                </div>
            </div>
        )
    }
    
}
export default TopNav;