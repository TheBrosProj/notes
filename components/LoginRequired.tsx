import { useAuth } from "./AuthContext";
import { Center } from "@chakra-ui/react";

interface LoginRequiredProps {
    auth_id: string | undefined,
    children: React.ReactNode;
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({ auth_id, children }) => {
    // const { handleError } = useApp();
    const { user } = useAuth();
    if (auth_id != undefined && user?.uid != auth_id) {
        console.log(auth_id);
        return (
            <>
                <Center p={'16'} mt={'32'} fontSize={'2xl'}>You must login with your account to view this content</Center>
            </>
        )
    }
    return (
        <>
            {user ? <>{children}</>
                : <>
                    <Center p={'16'} mt={'32'} fontSize={'2xl'}>Login or SignUp to continue to this page</Center>
                </>}
        </>
    );
};