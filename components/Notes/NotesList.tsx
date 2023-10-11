
import React from "react";
import { useRouter } from "next/router";
import {
    Button,
    Flex,
    IconButton,
    SimpleGrid,
    SlideFade,
} from "@chakra-ui/react";
import { faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteModal from "./NoteModal";
import { useNotes } from "./NotesContext";
import { Note } from "@/lib/types";

interface NoteListProps {
    ListType: "modal" | "button";
}

export default function NoteList({ ListType }: NoteListProps) {
    const router = useRouter();
    const { currentNote, SetCurrentNote, notes, handleDelete } = useNotes();
    const handleClick = (note: Note) => {
        SetCurrentNote(note);
    }
    return (
        <>
            <SimpleGrid mt={'16'} minChildWidth='xs' spacing='4' p={'2'}>
                {notes.map((note) => (
                    <SlideFade in={true} key={note.id}>
                        <Flex key={note.id} align="center" m="0" justify="space-between" boxShadow={'md'} borderRadius={'md'}>
                            {ListType == "modal" ? <>
                                <NoteModal note={note} />
                            </> : <>
                                <Button
                                    w={'full'}
                                    backgroundColor={'transparent'}
                                    onClick={() => { handleClick(note); }}>
                                    {note.details.substring(0, 24) + "..."}</Button>
                            </>}
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