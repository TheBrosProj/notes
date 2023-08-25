import React, { useState, useEffect } from 'react';
import { Flex, Input, Button, Text, useToast } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';

const BlocklistComponent = () => {
    const [blocklist, setBlocklist] = useState<string[]>([]);
    const [newBlocklistItem, setNewBlocklistItem] = useState('');
    const toast = useToast();
    const { user } = useAuth();

    const fetchBlocklist = async () => {
        try {
            const response = await fetch(`/api/blocklist/${user?.uid}`);
            const data = await response.json();
            setBlocklist(data);
        } catch (error) {
            console.error('Error fetching blocklist:', error);
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
                throw new Error('Failed to update blocklist');
            }
        } catch (error) {
            console.error('Error updating blocklist:', error);
        }
    };

    const deleteBlocklistItem = async (item: string) => {
        try {
            const response = await fetch(`/api/blocklist/${user.uid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item }),
            });

            if (response.ok) {
                toast({
                    title: 'Blocklist item deleted',
                    status: 'success',
                    duration: 2000,
                });
                fetchBlocklist(); // Refresh the blocklist after deletion
            } else {
                throw new Error('Failed to delete blocklist item');
            }
        } catch (error) {
            console.error('Error deleting blocklist item:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBlocklist();
        }
    }, []);

    const handleAddBlocklistItem = () => {
        if (newBlocklistItem.trim() === '') return;
        setBlocklist([...blocklist, newBlocklistItem]);
        setNewBlocklistItem('');
    };

    return (
        <Flex direction="column" p={4}>
            {blocklist.map((item, index) => (
                <Flex key={index} align="center" justify="space-between" my={1}>
                    <Text>{item}</Text>
                    <Flex align="center">
                        <FontAwesomeIcon
                            icon={faCheck}
                            color="green"
                            onClick={() => deleteBlocklistItem(item)} // Delete on icon click
                            style={{ cursor: 'pointer', marginRight: '8px' }}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            color="red"
                            onClick={() => deleteBlocklistItem(item)} // Delete on icon click
                            style={{ cursor: 'pointer' }}
                        />
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
                <Button colorScheme="teal" onClick={handleAddBlocklistItem}>
                    Add
                </Button>
            </Flex>
            <Button mt={4} colorScheme="blue" onClick={updateBlocklist}>
                Update Blocklist
            </Button>
        </Flex>
    );
};

export default BlocklistComponent;
