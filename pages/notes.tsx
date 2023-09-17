import { useNotes } from '@/components/Notes/NotesContext';
import NotesList from '@/components/Notes/NotesList';
import { NotesView } from '@/components/Notes/NotesView';
import { Grid, GridItem } from '@chakra-ui/react'

export default function Home() {

    const { currentNote } = useNotes();

    return (
        <>
            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}>
                <GridItem rowSpan={2} colSpan={1}>
                    <NotesList />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                    {(currentNote != null) && <NotesView note={currentNote} />}
                </GridItem>
            </Grid>
        </>
    )
}
