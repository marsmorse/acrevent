import { Redirect, Route } from "react-router-dom";
import axios from 'axios';

const { useState, useContext, createContext } = require("react");



export const authContext = createContext();

export function useAuth() {
    return useContext(authContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = (email, password) => {
        axios.post('/users/login', { 'email': email, 'password': password}).then( res => {
            let resObj = JSON.parse(res.data);
            console.log(resObj.user);
            console.log(res.data);
            setUser({ isAuthenticated: true, user: JSON.parse(res.data).user });
            return JSON.parse(res.data).user ;
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
                console.log(res);
                console.log(JSON.parse(res.data));
                setUser({ isAuthenticated: true, user: JSON.parse(res.data)});
                resolve(JSON.parse(res.data));
            }).catch( error => { 
                resolve(error);
            })
        })

    }
    return {
        user,
        signin,
        signout,
        register,

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
        <Route>
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
            }
        </Route>
    )
}