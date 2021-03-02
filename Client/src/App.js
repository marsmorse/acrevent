import './App.css';

import Events from './components/events.js'
import CreativesList from './components/creatives.js'
import LogIn from './components/log-in.js'
import Registration from './components/registration.js'
import Home from './components/home.js'

import { Route, Switch, Link, BrowserRouter } from "react-router-dom"
import { useContext } from 'react';

import { ProvideAuth, PrivateRoute } from './auth/auth';

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
      <ProvideAuth>
        <BrowserRouter>
          <Switch>
            <Route path='/Home'>
              <Home/>
            </Route>
            <PrivateRoute path='/Events'>
              <Events/>
            </PrivateRoute>
            <PrivateRoute path='/Creatives'>
              <CreativesList/>
            </PrivateRoute>
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
        </BrowserRouter>
      </ProvideAuth>
    </div>
  );
}

export default App;
/*



*/