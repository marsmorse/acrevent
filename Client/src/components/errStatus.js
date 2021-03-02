import React, {useState, useEffect } from 'react';
import { useAuth } from '../auth/auth';

export const ErrStatus = () => {
    
    let auth = useAuth();
    const [status, setStatus] = useState('ok');
    
    useEffect(() => {
        if (auth.error) {
            setStatus(auth.error.message);
        }
    }, [ auth.error.message ])

    useEffect(() => {
        return() => { auth.setError({message:'ok'}) }
    }, [])

    let err = status;
    if ( err === 'ok') {
        return(null)  
    }
    return(
        <div className="alert alert-danger" role="alert">
            <strong>❗️</strong> {err}
        </div>
    );
}