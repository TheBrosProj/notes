import { Box, Button, Center, FlexProps, Textarea } from "@chakra-ui/react";
import { useNotes } from "./NotesContext";
import { useEffect, useState } from "react";

interface NoteViewProps extends FlexProps {
}

export function NotesView({ ...rest }: NoteViewProps) {
    const { currentNote, handleUpdateNote } = useNotes();
    const [value, SetValue] = useState("");

    useEffect(()=>{
        SetValue(currentNote.details);
    },[currentNote])

    const handleSave = () => {
        if (currentNote!.details !== value) {
            handleUpdateNote({ ...currentNote!, details: value });
        }
    }
    return (
        <Box {...rest}>
            <Center gap={"8"}>
                <Button onClick={()=>{handleSave();}}>Save</Button>
            </Center>
            <Textarea
                value={value}
                onChange={(e) => { SetValue(e.target.value); }}
                resize={'none'}
                h={'full'}
                w={'full'}
                border="1px solid gray"
                borderRadius="md"
                m={"4"}
            />
        </Box>
    )
}