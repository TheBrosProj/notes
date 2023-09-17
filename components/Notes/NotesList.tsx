
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    Box,
    Center,
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
import { getLocal, setLocal } from "@/lib/storage";
import NoteModal from "./NoteModal";
import { Note } from "@/lib/types";
import { useNotes } from "./NotesContext";

interface NoteListProps {
}

export default function NoteList({}: NoteListProps) {
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();
    const router = useRouter();
    const { notes, handleUpdateNote, handleDelete } = useNotes();

    const handleError = (title?: string, reason?: string) => {
        toast({
            title: title ? title : 'Error',
            description: reason ? reason : 'Could not complete action, try again',
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }
    return (
    <>
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
                                    {/* <Editable fontSize='md' defaultValue={note.details} isTruncated onSubmit={(value) => handleUpdateNote({ ...note, details: value })}>
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable> */}
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
                    </SimpleGrid>}
    </>
    )
}