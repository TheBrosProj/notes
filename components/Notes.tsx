import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";

type Note = {
    id: number;
    details: string;
    src: string | null;
};

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
            setIsLoading(false);
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
    const handleUpdateNote = async (note: Note) => {
        try {
          const response = await fetch(`/api/note/${user.uid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              note_id: note.id,
              details: note.details, // updated details
              src: note.src, // updated src
            }),
          });
    
          if (response.ok) {
            const updatedNote = await response.json();
            const updatedNotes = notes.map((n) =>
              n.id === updatedNote.id ? updatedNote : n
            );
            setNotes(updatedNotes);
          } else {
            console.error('Failed to update note');
          }
        } catch (error) {
          console.error('Error updating note', error);
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
                                        <IconButton
                                            aria-label="Delete todo"
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
