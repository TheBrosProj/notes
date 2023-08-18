import React, { useState, useEffect } from 'react';
import { Center, Spinner, Text, Box, DarkMode, FlexProps } from '@chakra-ui/react';

interface LoadPageProps extends FlexProps {
    children: React.ReactNode;
}

const LoadPage: React.FC<LoadPageProps> = ({ children, ...rest }) => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <Box {...rest}>
            {
                domLoaded ? (
                    <>{children}</>
                ) : (
                    <>
                        <Center mt={"50vh"}>
                            <Spinner size={"xl"} />
                        </Center>
                        <Center mt={"4"}>
                            <Text>if you are reading this, change your internet</Text>
                        </Center>
                    </>
                )
            }
        </Box>
    );
};

export default LoadPage;
