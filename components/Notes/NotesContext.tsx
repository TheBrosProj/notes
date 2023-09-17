/** 
 * Not using this rn but plan to implement
 * connection manager so app works offline
 * as a pwa without any internet access
 */


import { getLocal, setLocal } from "@/lib/storage";
import { Note } from "@/lib/types";
import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
interface NotesContextType {
    notes: Note[],
    setNotes: React.Dispatch<SetStateAction<Note[]>>,
    handleAddNote: (input: string) => Promise<void>,
    handleDelete: (note: Note) => Promise<void>,
    handleUpdateNote: (note: Note) => Promise<void>,
    currentNote: Note | null,
    SetCurrentNote: React.Dispatch<SetStateAction<Note | null>>
}


const NotesContext = createContext<any | undefined>(undefined);

interface NotesProviderProps {
    children: ReactNode;
}

const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [currentNote, SetCurrentNote] = useState<Note|null>(null);
    const { user } = useAuth();

    useEffect(()=>{
    console.log(currentNote);
    },[currentNote]);
    const handleError = (title?: string, reason?: string) => {
        console.error(title + ":" + reason);
        // toast({
        //     title: title ? title : 'Error',
        //     description: reason ? reason : 'Could not complete action, try again',
        //     status: 'error',
        //     duration: 3000,
        //     isClosable: true,
        // })
    }

    useEffect(() => {
        setNotes(JSON.parse(getLocal('notes')) as Note[]);
        if (user) {
            fetchNotes();
        }
    }, [user]);

    const fetchNotes = async () => {
        try {
            const response = await fetch(`/api/note/${user.uid}`);

            if (response.ok) {
                const notesData = await response.json();
                setNotes(notesData);
                setLocal('notes', notesData);
            } else {
                handleError("failed to reach database");
            }
        } catch (error) {
            handleError("failed to fetch notes");
        } finally {
            // setIsLoading(false);
        }
    };
    const handleAddNote = async (input: string) => {
        if (user === null) {
            handleError("Log in to use Notes", "you must sign in to store your notes in the database.")
            return;
        }
        if (input) {
            const newTempNote: Note = { id: 999999, details: input, src: null };
            setNotes((prev) => { return [...prev, newTempNote] });
            try {
                const response = await fetch(`/api/note/${user.uid}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        details: input,
                        src: null,
                    }),
                });

                if (response.ok) {
                    const newNote = await response.json();
                    setNotes((prev) => {
                        setLocal('todos', [...prev.filter((t) => t.id !== newTempNote.id), newNote]);
                        return [...prev.filter((n) => n.id !== newTempNote.id), newNote];
                    });
                } else {
                    handleError("failed to reach database");
                    setNotes(JSON.parse(getLocal('notes')) as Note[]);
                }
            } catch (error) {
                handleError();
                setNotes(JSON.parse(getLocal('notes')) as Note[]);
            }
        }
    };

    const handleDelete = async (note: Note) => {
        setNotes(prev => [...prev.filter((t) => t.id !== note.id)]);
        try {
            const response = await fetch(`/api/note/${user.uid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    note_id: note.id,
                }),
            });
            if (response.ok) {
                setLocal('notes', [...notes.filter((t) => t.id !== note.id)]);
            } else {
                handleError("failed to reach database");
                setNotes(JSON.parse(getLocal('notes')) as Note[]);
            }
        } catch (error) {
            handleError();
            setNotes(JSON.parse(getLocal('notes')) as Note[]);
        }
    };
    const handleUpdateNote = async (note: Note) => {
        setNotes((prev) => {
            return prev.map((n) =>
                n.id === note.id ? note : n
            );
        });
        try {
            const response = await fetch(`/api/note/${user.uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    note_id: note.id,
                    details: note.details,
                    src: note.src,
                }),
            });

            if (response.ok) {
                const updatedNote = await response.json();
                const updatedNotes = notes.map((n) =>
                    n.id === updatedNote.id ? updatedNote : n
                );
                setNotes(updatedNotes);
                setLocal('notes', updatedNotes);
            } else {
                handleError("failed to reach database");
                setNotes(JSON.parse(getLocal('notes')) as Note[]);
            }
        } catch (error) {
            handleError();
            setNotes(JSON.parse(getLocal('notes')) as Note[]);
        }
    };
    return (
        <NotesContext.Provider value={{ notes, setNotes, handleAddNote, handleDelete, handleUpdateNote, currentNote, SetCurrentNote }}>
            {children}
        </NotesContext.Provider>
    );
}

const useNotes = (): NotesContextType => {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error('useNotes must be used within an AuthProvider');
    }
    return context;
};

export { NotesProvider, useNotes };