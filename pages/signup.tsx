/**
 * Nothing to explain just another boring login
 * TODO: update last_online in database upon login
 */

import { useRouter } from 'next/router';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    Center
} from '@chakra-ui/react';
import { GoogleProvider, auth, firebaseUser } from '@/lib/firebase';
import { useState } from 'react';

const Signup: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [uid, setUid] = useState<string>('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

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
                router.push('/');
            }
        }catch (error){
            console.log(error);
            handleSignUpError(error);
        }
    }

    const handleSignUpError = (error: any)=>{
        console.log('Signup error:', error);
        toast({
            title: `${(error as Error).message}`,
            status: 'error',
            isClosable: true,
        });
    }

    const handleGoogleSignIn = async ()=>{
        setIsLoading(true);
        try{
            const res = await auth.signInWithPopup(GoogleProvider);
            handlePostSignUp(res.user);
        }catch(error){
            handleSignUpError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password);
            handlePostSignUp(res.user);
        } catch (error) {
            handleSignUpError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box maxW="sm" mx="auto" mt={8} p={4}>
            <Heading mb={4}>Signup</Heading>
            <form onSubmit={handleSignup}>
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
                        aria-label='sign up'
                        type="submit"
                        colorScheme="gray"
                        m={4}
                        p={6}
                        borderRadius={'xl'}
                    >
                        Sign Up
                    </Button>
                </Center>
                <Center>
                    <Button onClick={()=>{handleGoogleSignIn()}}>
                        Sign in wit Google
                    </Button>
                </Center>
            </form>
        </Box>
    );
};

export default Signup;
