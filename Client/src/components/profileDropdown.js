import React from 'react';


export function ProfileDropdown() {

    return(
        <div className="dropdown">
            <a className="dropdown-toggle" href="#" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><span className="caret"></span></a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><h3 className="dropdown-item bold">Lebron</h3></li>
                <li><a className="dropdown-item dropdown-link" href="#">Sign Out</a></li>
                <li><a className="dropdown-item dropdown-link" href="#">Reset Password</a></li>
                <li><a className="dropdown-item dropdown-link" href="#">Delete Account</a></li>
            </ul>
        </div>
    )
}