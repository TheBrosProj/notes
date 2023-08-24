import { Box, Text } from '@chakra-ui/react';

// TODO: add relevant team information and contact info

export default function Home() {
    return (
        <>
                <Box minH={'80vh'} display="flex" flexDirection="column">
                    <Box maxW="md" mx="auto" mt={8} p={4}>
                        <Text fontSize={"4xl"} fontWeight={"extrabold"}>About</Text>
                        <Text>One stop solution to keep your brain farts organised</Text>
                    </Box>
                </Box>
        </>
    );
}
