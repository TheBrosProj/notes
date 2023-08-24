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
import { auth } from '@/lib/firebase';
import { useState } from 'react';

const Signup: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [uid, setUid] = useState<string>('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password);

            if (res.user?.email) {
                setEmail(res.user.email);
            }

            if (res.user?.uid) {
                setUid(res.user.uid);
                // Call the API route to create a user using the fetch API
                await fetch('/api/createUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user: { email, uid: res.user.uid } })
                });
            }

            // Redirect to dashboard on successful signup
        } catch (error) {
            console.log('Signup error:', error);
            toast({
                title: `${(error as Error).message}`,
                status: 'error',
                isClosable: true,
            });
            // Handle signup error
        } finally {
            setIsLoading(false);
            router.push('/');
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
            </form>
        </Box>
    );
};

export default Signup;
