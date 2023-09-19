
import React from "react";
import { useRouter } from "next/router";
import {
    Flex,
    IconButton,
    SimpleGrid,
    SlideFade,
} from "@chakra-ui/react";
import { faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteModal from "./NoteModal";
import { useNotes } from "./NotesContext";

interface NoteListProps {
}

export default function NoteList({ }: NoteListProps) {
    const router = useRouter();
    const { notes, handleDelete } = useNotes();

    return (
        <>
            <SimpleGrid minChildWidth='xs' spacing='4' p={'2'}>
                {notes.map((note) => (
                    <SlideFade in={true} key={note.id}>
                        <Flex key={note.id} align="center" m="2" justify="space-between" boxShadow={'md'} borderRadius={'md'}>
                            <NoteModal note={note} />
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
                                    mx="2"
                                    onClick={() => handleDelete(note)}
                                />
                            </Flex>
                        </Flex>
                    </SlideFade>
                ))}
            </SimpleGrid>
        </>
    )
}