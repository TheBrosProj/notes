import React, { useState, useEffect } from 'react';
import { Flex, Input, Button, Text, useToast, Center, Box, IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';
import { getCookies, setCookies } from '@/lib/cookies'

const BlocklistComponent = () => {
    const [blocklist, setBlocklist] = useState<string[]>([]);
    const [newBlocklistItem, setNewBlocklistItem] = useState('');
    const toast = useToast();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setBlocklist(JSON.parse(getCookies('blocklist')) as string[]);
            fetchBlocklist();
        }
    }, [user]);

    const fetchBlocklist = async () => {
        try {
            const response = await fetch(`/api/blocklist/${user?.uid}`);
            const data = await response.json();
            setCookies('blocklist', data);
            setBlocklist(data);
        } catch (error) {
            handleError('Error fetching blocklist');
        }
    };

    const updateBlocklist = async () => {
        try {
            const response = await fetch(`/api/blocklist/${user?.uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ blocklist }),
            });

            if (response.ok) {
                toast({
                    title: 'Blocklist updated',
                    status: 'success',
                    duration: 2000,
                });
            } else {
                handleError('Failed to update blocklist');
            }
        } catch (error) {
            handleError('Error updating blocklist:');
        }
    };

    const deleteBlocklistItem = async (item: string) => {
        setBlocklist((prev) => {
            const newBlocklist = prev.filter((b) => b == item);
            setCookies('blocklist', newBlocklist);
            return newBlocklist
        });
    };

    useEffect(() => {
        if (user) {
            fetchBlocklist();
        }
    }, []);

    const handleAddBlocklistItem = () => {
        if (newBlocklistItem.trim() === '') return;
        const newUrl = new URL(newBlocklistItem);
        if (!blocklist.includes(newUrl.hostname)) {
            setBlocklist([...blocklist, newUrl.hostname]);
        } else {
            toast({
                title: 'Blocklist entry already exists',
                status: 'info',
                duration: 2000,
            });
        }
        setNewBlocklistItem('');
    };

    const handleError = (title = 'Error', reason = 'Could not complete action, try again') => {
        toast({
            title,
            description: reason,
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Center>
            <Box
                p="2"
                m="2"
                w='3xl'
                border="1px solid gray"
                borderRadius="md"
                boxShadow='lg'
            >
                <Flex direction="column" p={4}>
                    {blocklist.map((item, index) => (
                        <Flex key={index} align="center" justify="space-between" my={1}>
                            <Text>{item}</Text>
                            <Flex align="center">
                                <IconButton aria-label='delete blocklist item' size={'lg'} onClick={() => deleteBlocklistItem(item)} icon={<FontAwesomeIcon icon={faTrash} />} />
                            </Flex>
                        </Flex>
                    ))}
                    <Flex mt={4}>
                        <Input
                            placeholder="Add new item"
                            value={newBlocklistItem}
                            onChange={(e) => setNewBlocklistItem(e.target.value)}
                            mr={2}
                        />
                        <Button colorScheme="gray" onClick={handleAddBlocklistItem}>
                            Add
                        </Button>
                    </Flex>
                    <Button mt={4} colorScheme="gray" onClick={updateBlocklist}>
                        Update Blocklist
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
};

export default BlocklistComponent;