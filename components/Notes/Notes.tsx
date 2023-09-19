/**
 * Notes : 
 * each not have details and src(optional)
 * this is to store info and its origin to
 * quickly refer when needed
 */

import React, { useState } from "react";
import {
    Box,
    Center,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotesList from "./NotesList";
import { useNotes } from "./NotesContext";



const Notes: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const { handleAddNote } = useNotes();

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
                            onClick={() => { handleAddNote(input); setInput(''); }}
                        />
                    </InputRightElement>
                </InputGroup>
                <NotesList />
            </Box>
        </Center>
    );
};

export default Notes;
