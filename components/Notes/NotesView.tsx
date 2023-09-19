import { Box, Textarea } from "@chakra-ui/react";
import { useNotes } from "./NotesContext";

interface NoteViewProps {
}

export function NotesView({ }: NoteViewProps) {
    const { currentNote, handleUpdateNote } = useNotes();
    return (
        <>
            <Box
                border="1px solid gray"
                borderRadius="md"
                m={"4"}>
                <Textarea
                    h={'2xl'}
                    w={'3xl'}
                    value={currentNote?.details}
                    // onChange={(e) => { handleUpdateNote({...currentNote, details: e.target.value})); }}
                    disabled
                    resize={'none'}
                    border="none"
                />
            </Box>
        </>
    )
}