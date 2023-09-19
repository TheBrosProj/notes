import PomodoroTimer from '@/components/Pomodoro';
import TodoList from '@/components/ToDo';
import Notes from '@/components/Notes/Notes';
import Summarizer from '@/components/Summarizer';
import BlocklistEditor from '@/components/BlockList';
import { Button, Center } from '@chakra-ui/react';
import { Pinger } from '@/components/Pinger';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

// used for beta testing and feature implementation

export default function Beta() {
  const { triggerPing } = useAuth();
  const router = useRouter();
  return (
    <>
      <Center m={'4'}>
        <Button mx={'2'} onClick={() => { triggerPing() }}>ping</Button>
        last online : <Pinger />
      </Center>
      <Center m={'4'}>
        <Button onClick={()=>{router.push('/notes')}}>Go To Experimental Notes Page</Button>
      </Center>
      <BlocklistEditor />
      <Summarizer />
      <PomodoroTimer />
      <TodoList />
      <Notes />
    </>
  )
}
