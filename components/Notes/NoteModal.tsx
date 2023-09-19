/**
 * Note Modal component that opens up to
 * Show details and edit option
 */

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import { Note } from "@/lib/types";
import { useState } from "react";
import { useNotes } from "./NotesContext";

interface NoteModalProps {
    note: Note,
}

export default function NoteModal({ note }: NoteModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, SetValue] = useState(note.details);
    const { handleUpdateNote } = useNotes();
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
                onClick={() =>{handleClick()}}
                p={8} w={'72'}>
                {note.details.substring(0, 24) + "..."}</Button>
            <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
                <ModalOverlay
                    bg='blackAlpha.200'
                    backdropFilter='blur(6px)'
                />
                <ModalContent>
                    {/* <ModalHeader>Modal Title</ModalHeader> */}
                    <ModalCloseButton onClick={()=>{SetValue(note.details)}} />
                    <ModalBody mt={'10'}>
                        <Textarea
                            h={'50vh'}
                            value={value}
                            onChange={(e) => { SetValue(e.target.value); }}
                            size='lg'
                            resize={'none'}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button mx={'2'} onClick={() => { onCloseButtonClick(note) }}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}