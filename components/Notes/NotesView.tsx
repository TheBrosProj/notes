import { Box, FlexProps, Textarea } from "@chakra-ui/react";
import { useNotes } from "./NotesContext";

interface NoteViewProps extends FlexProps {
}

export function NotesView({ ...rest }: NoteViewProps) {
    const { currentNote, handleUpdateNote } = useNotes();
    return (
        <Box {...rest}>
            <Textarea
                value={currentNote?.details}
                // onChange={(e) => { handleUpdateNote({...currentNote, details: e.target.value})); }}
                // disabled
                resize={'none'}
                h={'full'}
                border="1px solid gray"
                borderRadius="md"
                m={"4"}
            />
        </Box>
    )
}