import './App.css';

import Events from './components/events.js'
import CreativesList from './components/creatives.js'
import LogIn from './components/log-in.js'
import Registration from './components/registration.js'
import Home from './components/home.js'
import TopNav from './components/top-nav'

import { Switch, BrowserRouter } from "react-router-dom"
import { useEffect } from 'react';

import { PrivateRoute, PublicRoute } from './auth/auth';
import { useAuth } from './auth/auth';
import config from './config';
function App() {
  let auth = useAuth();
  useEffect(() => {
    if (auth.user.isAuthenticated === true) {
      setTimeout(function(){
        auth.setUser({ isAuthenticated: false, profile: null });
      }, config.sessiontime);
    }
  }, [auth.user.isAuthenticated])

  //window.location.reload(false);
  return (
    <div className="App">
      
        <BrowserRouter>
          <Switch>
            <PrivateRoute path='/Events'>
              <TopNav/>
              <Events/>
            </PrivateRoute>
            <PrivateRoute path='/Creatives'>
              <TopNav/>
              <CreativesList/>
            </PrivateRoute>
            <PublicRoute path='/Registration'>
              <Registration/>
            </PublicRoute>
            <PublicRoute path='/LogIn'>
              <LogIn/>
            </PublicRoute>
            <PublicRoute path='/'>
              <TopNav/>
              <Home/>
            </PublicRoute>
          </Switch>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
/*



*/