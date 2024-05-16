/**
 * Nothing to explain just another boring login
 * TODO: update last_online in database upon login
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import {
    useToast,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Center,
} from '@chakra-ui/react';
import { GoogleProvider, auth, firebaseUser } from '@/lib/firebase';

const Login: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password);
            router.push('/');
        } catch (error) {
            toast({
                title: `${(error as Error).message}`,
                status: 'error',
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async ()=>{
        setIsLoading(true);
        try{
            const res = await auth.signInWithPopup(GoogleProvider);
            handlePostSignUp(res.user);
        }catch(error){
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handlePostSignUp = async (user: firebaseUser | null) => {
        try{
            if (user?.email) {
                setEmail(user.email);
            }

            if (user?.uid) {
                // Call the API route to create a user using the fetch API
                await fetch('/api/createUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user: { email: user.email, uid: user.uid } })
                });
            }
            router.push('/');
        }catch (error){
            console.log(error);
        }
    }

    return (
        <Box maxW="sm" mx="auto" mt={8} p={4}>
            <Heading mb={4}>Login</Heading>
            <form onSubmit={handleLogin}>
                <FormControl id="email" mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Center>
                    <Button
                        aria-label='Log in'
                        isLoading={isLoading}
                        type="submit"
                        colorScheme="gray"
                        m={4}
                        p={6}
                        borderRadius={'xl'}
                    >
                        Log In
                    </Button>
                </Center>
                <Center>
                    <Button onClick={()=>{handleGoogleSignIn()}}>
                        Sign in with Google
                    </Button>
                </Center>
            </form>
        </Box>
    );
};

export default Login;
