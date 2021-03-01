import '../styles/nav.css'
import { Link } from 'react-router-dom';

export function Nav() {
    return(
        <div className="top-nav-cont">
            <ul>
            <li>
                <Link to="/Home">Home</Link>
            </li>
            <li>
                <Link to="/Events">Events</Link>
            </li>
            <li>
                <Link to="/Registration">Registration</Link>
            </li>
            <li>
                <Link to="/LogIn">Log In</Link>
            </li>
            <li>
                <Link to="/Creatives">Creatives</Link>
            </li>
            </ul>
      </div>
    )
}