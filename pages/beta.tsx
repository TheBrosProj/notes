import PomodoroTimer from '@/components/Pomodoro';
import TodoList from '@/components/ToDo';
import Notes from '@/components/Notes';
import Summarizer from '@/components/Summarizer';
import BlocklistEditor from '@/components/BlockList';
import { Center } from '@chakra-ui/react';
import { Pinger } from '@/components/Pinger';

// used for beta testing and feature implementation

export default function Beta() {
  return (
    <>
    <Center> last online : <Pinger/> </Center>
      <BlocklistEditor />
      <Summarizer />
      <PomodoroTimer />
      <TodoList />
      <Notes />
    </>
  )
}
