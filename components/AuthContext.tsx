/**
 * where components get user variable for uuid , email and all
*/

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import firebase from "firebase/app"

interface data {
    user_id: string;
    email: string;
    last_online: string;
    blocklist: string[];
}

interface AuthContextType {
    user: firebase.User | null;
    setUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
    ping: data | null;
    triggerPing: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [ping, setPing] = useState<data | null>(null);
    useEffect(() => {
        if (user) {
            triggerPing();
        }
    }, [user])

    const triggerPing = async () => {
        if (user != null) {
            try {
                const response = await fetch(`/api/ping/${user.uid}`);

                if (response.ok) {
                    const pingData = await response.json();
                    setPing(pingData as data);
                    console.log(pingData);
                } else {
                    console.log("failed to reach database");
                }
            } catch (error) {
                console.log(error);
                // handleError("failed to fetch todos");
            } finally {
                // setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(u => {
            if (u) {
                setUser(u);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, ping, triggerPing }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
