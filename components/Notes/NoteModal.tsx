/**
 * Note Modal component that opens up to
 * Show details and edit option
 */

import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import { Note } from "@/lib/types";
import { useState } from "react";
import { useNotes } from "./NotesContext";
import Link from "next/link";
import { useAuth } from "../AuthContext";

interface NoteModalProps {
    note: Note,
}

export default function NoteModal({ note }: NoteModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleUpdateNote } = useNotes();
    const [value, SetValue] = useState(note.details);
    const { user } = useAuth();
    const handleClick = () => {
        onOpen();
    }
    const onCloseButtonClick = (note: Note) => {
        if (note.details !== value) {
            handleUpdateNote({ ...note, details: value });
        }
        onClose();
    }
    return (
        <>
            <Button
                backgroundColor={'transparent'}
                onClick={() => { handleClick() }}
                p={8} w={'72'}>
                {note.details.substring(0, 24) + "..."}</Button>
            <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
                <ModalOverlay
                    bg='blackAlpha.200'
                    backdropFilter='blur(6px)'
                />
                <ModalContent>
                    {/* <ModalHeader>Modal Title</ModalHeader> */}
                    <ModalCloseButton onClick={() => { SetValue(note.details) }} />
                    <ModalBody mt={'8'}>
                        <Center>
                            {/* <NotesView h={'60vh'} w={'xl'} /> */}
                            <Textarea
                                value={value}
                                onChange={(e) => { SetValue(e.target.value); }}
                                // disabled
                                resize={'none'}
                                h={'60vh'}
                                w={'xl'}
                                border="1px solid gray"
                                borderRadius="md"
                                m={"4"}
                            />
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Link href={`/${user?.uid}/${note.id}`}><Button mx={'2'}>Go To</Button></Link>
                        <Button mx={'2'} onClick={() => { onCloseButtonClick(note) }}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}