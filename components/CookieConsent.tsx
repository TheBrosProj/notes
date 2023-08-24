import { Box, Button, Slide, useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function CookieConsentSlide() {
    const { isOpen, onToggle } = useDisclosure();
    useEffect(() => {
        const consent = Cookies.get('cookies');
        if (consent === "allow" || consent === "deny") {
            if (isOpen) {
                onToggle();
            }
        } else {
            if (!isOpen) {
                onToggle();
            }
        }
    }, []);
    return (
        <>
            <Slide direction='bottom' in={isOpen} style={{ zIndex: 10, textAlign: 'center' }}>
                <Box
                    p='10'
                    m='2'
                    border="1px solid gray"
                    rounded='md'
                    boxShadow='lg'
                    shadow='md'
                    color={'white'}
                    bg={'gray.800'}
                >
                    This webpage uses cookies to store neccessary information.
                    <br />
                    It's okay not to use cookies [ might cause reduced performance ]
                    <br />
                    <Button m={'4'} onClick={() => {
                        onToggle();
                        Cookies.set('cookies', 'allow');
                    }}>I consent</Button>
                                        <Button m={'4'} onClick={() => {
                        onToggle();
                        Cookies.set('cookies', 'deny');
                    }}>I don't consent</Button>
                </Box>
            </Slide>
        </>
    )
}