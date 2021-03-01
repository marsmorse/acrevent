import { createContext, useContext } from 'react'

export const UserContext = createContext();

export function useProvideAuth() {
    return useContext(UserContext);
}