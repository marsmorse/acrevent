import logo from './logo.svg';
import './App.css';
import Events from './components/events.js'
import Creatives from './components/creatives.js'
function App() {
  return (
    <div className="App">
      <h2>Hello Lebron</h2>
      <h4>Check out your upcoming events!</h4>
      {logo}
        <div className="dropdown">
          <a className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><span className="caret"></span>
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><h3 className="dropdown-item bold">Lebron</h3></li>
            <li><a className="dropdown-item dropdown-link" href="#">Sign Out</a></li>
            <li><a className="dropdown-item dropdown-link" href="#">Reset Password</a></li>
            <li><a className="dropdown-item dropdown-link" href="#">Delete Account</a></li>
          </ul>
        </div>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" className="btn btn-lg btn-primary">Get Started</button>
        <div className="Landing-photo"/>
      </header>
      <Events/>
      <Creatives/>
    </div>
  );
}

export default App;
