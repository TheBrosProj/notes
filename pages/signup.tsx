import { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast
} from '@chakra-ui/react';
import { auth } from '@/lib/firebase';

const Signup: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            router.push('/'); // Redirect to dashboard on successful signup
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
                <Button
                    aria-label='sign up'
                    type="submit"
                    colorScheme="gray"
                    mb={4}
                >
                    Sign Up
                </Button>
            </form>
        </Box>
    );
};

export default Signup;
