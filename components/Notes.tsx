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
    useToast
} from "@chakra-ui/react";
import { faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";
import Cookies from 'js-cookie';

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
        if (user) {
            fetchNotes();
        }
        else {
            getCookies();
        }
    }, [user]);

    const setCookies = (noteArray: Note[]) => {
        Cookies.set('notes', JSON.stringify(noteArray));
    };

    const getCookies = () => {
        const CookieNotes: string | undefined = Cookies.get('notes');
        if (CookieNotes) {
            setNotes(JSON.parse(CookieNotes) as Note[]);
            setIsLoading(false);
        }
        toast({
            title: 'Loaded Notes',
            description: "Loaded notes from cookies",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    };

    const fetchNotes = async () => {
        try {
            const response = await fetch(`/api/note/${user.uid}`);

            if (response.ok) {
                const notesData = await response.json();
                setNotes(notesData);
                setCookies(notesData);
                console.log("cookies set");
            } else {
                console.error("Failed to fetch notes");
            }
        } catch (error) {
            console.error("Error fetching notes", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = () => {
        toast({
            title: 'Error',
            description: "Could not complete action, try again",
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }

    const handleAddNote = async () => {
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
                handleError();
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
                setCookies([...notes.filter((t) => t.id !== note.id)]);
            } else {
                handleError();
                getCookies();
            }
        } catch (error) {
            handleError();
            getCookies();
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
                handleError();
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
                        onChange={(e) => setInput(e.target.value)}
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
                            <Skeleton boxShadow={'md'} borderRadius={'2xl'}>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                            </Skeleton>
                            <Skeleton boxShadow={'md'} borderRadius={'2xl'}>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                            </Skeleton>
                            <Skeleton boxShadow={'md'} borderRadius={'2xl'}>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                            </Skeleton>
                            <Skeleton boxShadow={'md'} borderRadius={'2xl'}>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                                <div>please wait while we load notes</div>
                            </Skeleton>
                        </SimpleGrid>
                    </> :
                    <SimpleGrid minChildWidth='xs' spacing='4' p={'2'}>
                        {notes.map((note) => (
                            <Box key={note.id} boxShadow={'md'} borderRadius={'md'}>
                                <Flex key={note.details} align="center" m="2" justify="space-between">
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
                            </Box>
                        ))}
                    </SimpleGrid>}
            </Box>
        </Center>
    );
};

export default Notes;
