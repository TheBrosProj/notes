import React, { useEffect, useState } from "react";
import {
    Box,
    Center,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Skeleton,
} from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomEditable from "./CustomEditable";
import { useAuth } from "./AuthContext";

type Note = {
    id: number;
    details: string;
    src: string | null;
};

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
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
            } else {
                console.error("Failed to fetch notes");
            }
        } catch (error) {
            console.error("Error fetching notes", error);
        } finally {
            setIsLoading(true);
        }
    };

    const handleAddNote = async () => {
        try {
            const response = await fetch(`/api/note/${user.uid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    details: input,
                    src: "google.com",
                }),
            });

            if (response.ok) {
                const newNote = await response.json();
                setNotes([...notes, newNote]);
                setInput("");
            } else {
                console.error("Failed to add note");
            }
        } catch (error) {
            console.error("Error adding note", error);
        }
    };

    const handleDelete = async (note: Note) => {
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
                setNotes([...notes.filter((t) => t.id !== note.id)]);
            } else {
                console.error("Failed to delete note");
            }
        } catch (error) {
            console.error("Error deleting note", error);
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
                { isLoading ?
                    <>
                    <SimpleGrid minChildWidth='xs' spacing='4' p={'2'}>
                        <Skeleton boxShadow={'md'} borderRadius={'md'}>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                        </Skeleton>
                        <Skeleton  boxShadow={'md'} borderRadius={'md'}>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                        </Skeleton>
                        <Skeleton  boxShadow={'md'} borderRadius={'md'}>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                        </Skeleton>
                        <Skeleton  boxShadow={'md'} borderRadius={'md'}>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                        </Skeleton>
                        </SimpleGrid>
                    </> :
                    <SimpleGrid minChildWidth='xs' spacing='4' p={'2'}>
                        {notes.map((note) => (
                            <Box key={note.id} boxShadow={'md'} borderRadius={'md'}>
                                <CustomEditable
                                    content={note.details}
                                    handleDelete={() => {
                                        handleDelete(note);
                                    }}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>}
            </Box>
        </Center>
    );
};

export default Notes;
