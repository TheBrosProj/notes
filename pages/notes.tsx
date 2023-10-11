import { useAuth } from '@/components/AuthContext';
import { LoginRequired } from '@/components/LoginRequired';
import Notes from '@/components/Notes/Notes';
import NoteList from '@/components/Notes/NotesList';
import { NotesView } from '@/components/Notes/NotesView';
import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react'

export default function Home() {

    const { user } = useAuth();
    const [isSmallScreen] = useMediaQuery("(max-width: 700px)");

    return (
        <>
            <LoginRequired auth_id={user?.uid}>
                {isSmallScreen ? <><Notes /></> : <>
                    <Grid
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(5, 1fr)'
                        gap={4}>
                        <GridItem rowSpan={2} colSpan={1} mt={'2'}>
                            <NoteList ListType='button' />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                            <NotesView
                                h={'80vh'}
                                w={'60vw'}
                            />
                        </GridItem>
                    </Grid>
                </>}
            </LoginRequired>
        </>
    )
}
