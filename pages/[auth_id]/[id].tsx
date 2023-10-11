import { useAuth } from "@/components/AuthContext";
import { LoginRequired } from "@/components/LoginRequired";
import { useNotes } from "@/components/Notes/NotesContext";
import { NotesView } from "@/components/Notes/NotesView";
import { Button, Center } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router"

export default function NotePage() {
    const router = useRouter()
    const { user } = useAuth();
    const { auth_id, id } = router.query;
    const { notes, SetCurrentNote } = useNotes();
    const note = notes.find((value) => value.id === parseInt(id as string));
    console.log(notes.find((value) => value.id === parseInt(id as string)));
    console.log(note);
    if (note != undefined) {
        SetCurrentNote(note);
    } else {
        return (
            <>
                <Center p={'16'} mt={'32'} fontSize={'2xl'}>Note does not exist</Center>
            </>
        )
    }
    console.log(auth_id);
    console.log(id);
    return (
        <LoginRequired auth_id={auth_id as string}>
            <Center>
                <NotesView h={'80vh'} w={'80vw'} />
            </Center>
        </LoginRequired>
    )
}