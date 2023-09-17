import { Note } from "@/lib/types"
import { Textarea } from "@chakra-ui/react";
import { useState } from "react";

interface NoteViewProps {
    note: Note,
}

export function NotesView({ note }: NoteViewProps) {
    const [value, SetValue] = useState(note.details);
    return (
        <>
            <Textarea
                h={'50vh'}
                value={value}
                onChange={(e) => { SetValue(e.target.value); }}
                size='lg'
                resize={'none'}
            />
        </>
    )
}