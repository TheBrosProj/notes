/**
 * Notes : 
 * each not have details and src(optional)
 * this is to store info and its origin to
 * quickly refer when needed
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    Box,
    Center,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Skeleton,
    SlideFade,
    useToast
} from "@chakra-ui/react";
import { faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";
import { getCookies, setCookies } from "@/lib/cookies";

type Note = {
    id: number;
    details: string;
    src: string | null;
};



const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const toast = useToast();
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        setNotes(JSON.parse(getCookies('notes')) as Note[]);
        setIsLoading(false);
        if (user) {
            fetchNotes();
        }
    }, [user]);

    const fetchNotes = async () => {
        try {
            const response = await fetch(`/api/note/${user.uid}`);

            if (response.ok) {
                const notesData = await response.json();
                setNotes(notesData);
                setCookies('notes', notesData);
            } else {
                handleError("failed to reach database");
            }
        } catch (error) {
            handleError("failed to fetch notes");
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (title?: string, reason?: string) => {
        toast({
            title: title ? title : 'Error',
            description: reason ? reason : 'Could not complete action, try again',
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }

    const handleAddNote = async () => {
        if(user === null){
            handleError("Log in to use Notes","you must sign in to store your notes in the database.")
            return;
        }
        try {
            const response = await fetch(`/api/note/${user.uid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    details: input,
                    src: null,
                }),
            });

            if (response.ok) {
                const newNote = await response.json();
                setNotes([...notes, newNote]);
                setInput("");
            } else {
                handleError("failed to reach database");
            }
        } catch (error) {
            handleError();
        }
    };

    const handleDelete = async (note: Note) => {
        setNotes(prev => [...prev.filter((t) => t.id !== note.id)]);
        try {
            const response = await fetch(`/api/note/${user.uid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    note_id: note.id,
                }),
            });
            if (response.ok) {
                setCookies('notes', [...notes.filter((t) => t.id !== note.id)]);
            } else {
                handleError("failed to reach database");
                setNotes(JSON.parse(getCookies('notes')) as Note[]);
            }
        } catch (error) {
            handleError();
            setNotes(JSON.parse(getCookies('notes')) as Note[]);
        }
    };
    const handleUpdateNote = async (note: Note) => {
        try {
            const response = await fetch(`/api/note/${user.uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    note_id: note.id,
                    details: note.details,
                    src: note.src,
                }),
            });

            if (response.ok) {
                const updatedNote = await response.json();
                const updatedNotes = notes.map((n) =>
                    n.id === updatedNote.id ? updatedNote : n
                );
                setNotes(updatedNotes);
            } else {
                handleError("failed to reach database");
            }
        } catch (error) {
            handleError();
        }
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
                overflowY="auto"
            >
                <InputGroup p={'4'} marginBottom={'2'}>
                    <Input
                        placeholder="Enter a new note"
                        value={input}
                        onChange={(e) => { setInput(e.target.value) }}
                        h={'24'}
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label="Add Notes"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={handleAddNote}
                        />
                    </InputRightElement>
                </InputGroup>
                {isLoading ?
                    <>
                        <SimpleGrid minChildWidth='xs' spacing='3' p={'2'}>
                            <Skeleton boxShadow={'md'} borderRadius={'xl'}>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                            </Skeleton>
                            <Skeleton boxShadow={'md'} borderRadius={'xl'}>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                            </Skeleton>
                            <Skeleton boxShadow={'md'} borderRadius={'xl'}>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                            </Skeleton>
                            <Skeleton boxShadow={'md'} borderRadius={'xl'}>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                            </Skeleton>
                        </SimpleGrid>
                    </> :
                    <SimpleGrid minChildWidth='xs' spacing='4' p={'2'}>
                        {notes.map((note) => (
                            <SlideFade in={true} key={note.id}>
                                <Flex key={note.id} align="center" m="2" justify="space-between" boxShadow={'md'} borderRadius={'md'}>
                                    <Editable fontSize='md' defaultValue={note.details} isTruncated onSubmit={(value) => handleUpdateNote({ ...note, details: value })}>
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                    <Flex>
                                        {note.src != null &&
                                            <IconButton
                                                aria-label="Go to source"
                                                icon={<FontAwesomeIcon icon={faLink} />}
                                                ml="2"
                                                onClick={() => { router.push(`${note.src}`) }}
                                            />
                                        }
                                        <IconButton
                                            aria-label="Delete Note"
                                            icon={<FontAwesomeIcon icon={faTrash} />}
                                            ml="2"
                                            onClick={() => handleDelete(note)}
                                        />
                                    </Flex>
                                </Flex>
                            </SlideFade>
                        ))}
                    </SimpleGrid>}
            </Box>
        </Center>
    );
};

export default Notes;
