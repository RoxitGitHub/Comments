// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useOAuth } from '@clerk/clerk-expo';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { isLoaded, isSignedIn, user } = useOAuth();
    const [clerkUser, setClerkUser] = useState(null);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            console.log('User loaded:', user);
            setClerkUser(user);
        }
    }, [isLoaded, isSignedIn, user]);

    return (
        <UserContext.Provider value={{ clerkUser }}>
            {children}
        </UserContext.Provider>
    );
};
