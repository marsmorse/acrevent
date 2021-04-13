import { Redirect, Route, browserHistory, useHistory } from "react-router-dom";
import axios from 'axios';

const { useState, useContext, createContext, useEffect } = require("react");



export const authContext = createContext();

export function useAuth() {
    return useContext(authContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState({ isAuthenticated: false, profile: null});
    const [error, setError] = useState({message:'ok'});
    const history = useHistory();



    useEffect(() => {
            axios.get('/users/sessionLogin').then( res => {
                if (res.data === 'Invalid Session') {
                    setUser({ isAuthenticated: false, profile: null })
                    history.push('/LogIn');
                } else if (typeof res.data !== undefined) {
                    console.log('setting user');
                    setUser({ isAuthenticated: true, profile: res.data, sessionExpiration: res.data})
                    console.log('user set');
                } else {
                    console.log('no luck');
                }

            }).catch( err => {
                console.log(err);
            })
    }, [])

    const signin = (email, password) => {
        return new Promise( resolve => {
            axios.post('/users/login', { 'email': email, 'password': password}).then( res => {
                
                if (!res.data.user && res.data.error) {
                    //console.log(res.data.error);
                    let message = res.data.error;
                    setError({ message: message });
                    resolve('error');
                } else {
                    setUser({ isAuthenticated: true, profile: JSON.parse(res.data) });
                    resolve('success');
                }
                
            }).catch( error => { 
                console.log(error);
                resolve('error');
            })
        });
    }

    const signout = () => {
        axios.post('/users/signout').then( res => {
            
        }).catch( error => { 
            console.log(error);
            
        })
        //sign out 
        //setUser(null);
    }
    const register = (credentials) => {
        return new Promise( resolve => {
            axios.post('/users/register', credentials).then( res => {
                if (!res.user && res.data.error) {
                    console.log(res.data.error);
                    let message = res.data.error;
                    setError({ message: message });
                    resolve();
                } else {
                    let resObj = JSON.parse(res.data);
                    console.log(resObj.user);
                    console.log(res.data);
                    setUser({ isAuthenticated: true, profile: JSON.parse(res.data) });
                    resolve(JSON.parse(res.data));
                }
            }).catch( error => { 
                resolve();
            })
        })

    }
    return {
        user,
        setUser,
        signin,
        signout,
        register,
        error,
        setError,
    }
}

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    return(
        <authContext.Provider value={auth}>
            { children }
        </authContext.Provider>
    );
}


/*
    Wrapper for route that requires user object
*/
export function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return(
        <Route
            {...rest}
            render={({ location }) => auth.user.isAuthenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: '/LogIn',
                        state: { from: location }
                    }}
                />
            )
            }>
        </Route>
    );
}

export function PublicRoute({ children, ...rest }) {
    let auth = useAuth();
    return(
        <Route
            {...rest}
            render={({ location }) => auth.user.isAuthenticated ? (
                <Redirect
                    to={{
                        pathname: '/Events',
                        state: { from: location }
                    }}
                />
                
            ) : (
                children
            )
            }/>
    );
}

