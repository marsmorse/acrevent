import { Redirect, Route } from "react-router-dom";
import axios from 'axios';
const { useState, useContext, createContext } = require("react");



export const authContext = createContext();

export function useAuth() {
    return useContext(authContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState({message:'ok'});
    
    const signin = (email, password) => {
        
        axios.post('/users/login', { 'email': email, 'password': password}).then( res => {
            
            if (!res.user && res.data.error) {
                console.log(res.data.error);
                let message = res.data.error;
                setError({ message: message });
            } else {
                let resObj = JSON.parse(res.data);
                console.log(resObj.user);
                console.log(res.data);
                setUser({ isAuthenticated: true, user: JSON.parse(res.data).user });
                
                
                return JSON.parse(res.data).user;
            }
            
        }).catch( error => { 
            console.log(error);
        })
        //sign in 
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
                    setUser({ isAuthenticated: true, user: JSON.parse(res.data) });
                    resolve(JSON.parse(res.data));
                }
            }).catch( error => { 
                resolve();
            })
        })

    }
    return {
        user,
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
                        pathname: '/login',
                        state: { from: location }
                    }}
                />
            )
            }>
        </Route>
    );
}