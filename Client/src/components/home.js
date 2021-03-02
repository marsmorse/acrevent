import '../styles/homepage.css';
import Nav from './nav';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/auth';

function Home() {
  let auth = useAuth();
  console.log(auth.user);
  console.log(auth.error);

  return (
    <div className="home">
      <div className="top-nav-cont">
        <div></div>
        <img src='../logo.svg' alt='Acrevent logo' className="top-nav-center"></img>
        <div className="top-nav-right">
          <Link className='nav-link text-nowrap' to='/LogIn'>Sign In</Link>
          <Link className='nav-link text-nowrap' to='/Registration'>Register</Link>
        </div>
      </div>
      <div className='d-flex flex-column full-page'>
        <div id="landing-cont">
          <div id="landing-sub-cont">
            <div>
              <h2>Never miss out on a show again</h2>
              <p>Acrevent helps you stay up to date on events with the artists you love.</p>
              <button type="button" className="btn btn-lg btn-primary">Get Started</button>
            </div>
            <div className="Landing-photo"/>
          </div>
        </div>
      </div>
      <footer className="pt-4 pt-md-5 border-top footer">
        <div className='row'>
          <div className='col-6 col-md'>
            <img className="mb-2" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="24" height="24"/>
            <small className="d-block mb-3 text-muted">© 2020</small>
          </div>
        </div>
        <div className='row'>
          <div className='col-6 col-md'>
            <a className="footer-link">About</a>
            <a className="footer-link">Contact</a>
            <a className="footer-link">Help</a>
            <a className="footer-link">Private Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;