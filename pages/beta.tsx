import PomodoroTimer from '@/components/Pomodoro';
import TodoList from '@/components/ToDo';
import Notes from '@/components/Notes/Notes';
import Summarizer from '@/components/Summarizer';
import BlocklistEditor from '@/components/BlockList';
import { Button, Center } from '@chakra-ui/react';
import { Pinger } from '@/components/Pinger';
import { useAuth } from '@/components/AuthContext';

// used for beta testing and feature implementation

export default function Beta() {
  const { triggerPing } = useAuth();
  return (
    <>
      <Center>
        <Button onClick={() => { triggerPing() }}>ping</Button>
        last online : <Pinger />
      </Center>
      <BlocklistEditor />
      <Summarizer />
      <PomodoroTimer />
      <TodoList />
      <Notes />
    </>
  )
}
