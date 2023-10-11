/** 
 * Not using this rn but plan to implement
 * connection manager so app works offline
 * as a pwa without any internet access
*/


import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
interface AppContextType {
    connection: 'online' | 'offline',
    SetConnection: React.Dispatch<React.SetStateAction<'online'|'offline'>>;
    handleError: (title?: string, reason?: string) => void,
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const toast = useToast();
    const [connection, SetConnection] = useState<'online' | 'offline'>('offline');
    useEffect(() => {
        
    }, []);

    const handleError = (title?: string, reason?: string) => {
        toast({
            title: title ? title : 'Error',
            description: reason ? reason : 'Could not complete action, try again',
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }

    const ping = async () => {
        const response = await fetch('/api/ping');
        if(response.ok){
            SetConnection('online')
        }else{
            SetConnection('offline')
        }
    }
    return (
        <AppContext.Provider value={{connection,SetConnection,handleError}}>
            {children}
        </AppContext.Provider>
    );
}

const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

export { AppProvider, useApp };