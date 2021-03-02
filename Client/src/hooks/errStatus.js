import { useEffect, useState } from 'react'
import { useAuth } from '../auth/auth'

export function useErrStatus() {
    let auth = useAuth();
    const [status, setStatus] = useState('ok');
    

    useEffect(() => {
        if (auth.error) {
            setStatus(auth.error.message);
        }
    }, [ auth.error.message ])

    useEffect(() => {
        if (auth.error) {
            setStatus(auth.error.message);
        }
    }, [ auth.error.message ])

    console.log(status)
    return status;
    
}
