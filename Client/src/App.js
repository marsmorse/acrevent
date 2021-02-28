import './App.css';

import Events from './components/events.js'
import CreativesList from './components/creatives.js'
import LogIn from './components/log-in.js'
import Registration from './components/registration.js'
import Home from './components/home.js'

import { Route, Switch, Link, HashRouter } from "react-router-dom"

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
function App() {
  return (
    <div className="App">
        <div className="dropdown">
          <a className="dropdown-toggle" href="#" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><span className="caret"></span>
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><h3 className="dropdown-item bold">Lebron</h3></li>
            <li><a className="dropdown-item dropdown-link" href="#">Sign Out</a></li>
            <li><a className="dropdown-item dropdown-link" href="#">Reset Password</a></li>
            <li><a className="dropdown-item dropdown-link" href="#">Delete Account</a></li>
          </ul>
        </div>

        <HashRouter>
          <nav>
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
          </nav>
          <Switch>
            <Route path='/Home'>
              <Home/>
            </Route>
            <Route path='/Events'>
              <Events/>
            </Route>
            <Route path='/Creatives'>
              <CreativesList/>
            </Route>
            <Route path='/Registration'>
              <Registration/>
            </Route>
            <Route path='/LogIn'>
              <LogIn/>
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
          </Switch>
        </HashRouter>
    </div>
  );
}

export default App;
/*



*/