/** 
 * Not using this rn but plan to implement
 * connection manager so app works offline
 * as a pwa without any internet access
 */


import { ReactNode, createContext, useContext, useEffect, useState } from "react";
interface AppContextType {
    connection: 'online' | 'offline',
    SetConnection: React.Dispatch<React.SetStateAction<'online'|'offline'>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [connection, SetConnection] = useState<'online' | 'offline'>('offline');
    useEffect(() => {
        
    }, []);

    const ping = async () => {
        const response = await fetch('/api/ping');
        if(response.ok){
            SetConnection('online')
        }else{
            SetConnection('offline')
        }
    }
    return (
        <AppContext.Provider value={{connection,SetConnection}}>
            {children}
        </AppContext.Provider>
    );
}

const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AppProvider, useApp };