import React, { useState } from "react";
import {
    Box,
    Center,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
} from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomEditable from "./CustomEditable";

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    const handleAddNote = () => {
        if (input) {
            setNotes([...notes, input]);
            setInput("");
        }
    };

    const handleDeleteNote = (note: string) => {
        setNotes(notes.filter((t) => t !== note));
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
                <SimpleGrid minChildWidth='xs' spacing='4' p={'2'}>
                    {notes.map((note) => (
                        <Box key={note} boxShadow={'md'} borderRadius={'md'}>
                            <CustomEditable
                                content={note}
                                handleDelete={() => {
                                    handleDeleteNote(note);
                                }}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </Center>
    );
};

export default Notes;
