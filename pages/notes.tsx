import Notes from '@/components/Notes/Notes';
import { useNotes } from '@/components/Notes/NotesContext';
import { NotesView } from '@/components/Notes/NotesView';
import { Note } from '@/lib/types';
import { Button, Flex, Grid, GridItem, IconButton, SimpleGrid, SlideFade, useMediaQuery } from '@chakra-ui/react'
import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

export default function Home() {

    const { currentNote, SetCurrentNote, notes, handleDelete } = useNotes();
    const [isSmallScreen] = useMediaQuery("(max-width: 700px)");
    const router = useRouter();

    const handleClick = (note: Note) => {
        SetCurrentNote(note);
    }

    return (
        <>{isSmallScreen ? <><Notes /></> : <>
            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}>
                <GridItem rowSpan={2} colSpan={1}>
                    <SimpleGrid minChildWidth='xs' spacing='4' p={'2'}>
                        {notes.map((note) => (
                            <SlideFade in={true} key={note.id}>
                                <Flex key={note.id} align="center" m="0" justify="space-between" boxShadow={'md'} borderRadius={'md'}>
                                    <Button
                                        w={'64'}
                                        backgroundColor={'transparent'}
                                        onClick={() => { handleClick(note) }}>
                                        {note.details.substring(0, 24) + "..."}</Button>
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
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                    <NotesView />
                </GridItem>
            </Grid>
        </>}
        </>
    )
}
