/**
 * because consent is sexy
 */

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
                    p={'4'}
                    m={'4'}
                    border="1px solid gray"
                    rounded='md'
                    boxShadow='lg'
                    shadow='md'
                    color={'white'}
                    bg={'gray.800'}
                    fontSize={'md'}
                >
                    This webpage uses cookies to store neccessary information.
                    <br />
                    We use them to store cache, preferences and other info that only stays in your browser.
                    <br />
                    We also use third party services like googleapis for authentication.
                    <br />
                    <Button
                        fontSize={'sm'}
                        m={'1'} onClick={() => {
                            onToggle();
                            Cookies.set('cookies', 'allow');
                        }}>Allow Cookies</Button>
                    <Button
                        fontSize={'sm'}
                        m={'1'} onClick={() => {
                            onToggle();
                            Cookies.set('cookies', 'deny');
                        }}>Neccessary Cookies Only</Button>
                </Box>
            </Slide>
        </>
    )
}