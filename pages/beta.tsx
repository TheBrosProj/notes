import PomodoroTimer from '@/components/Pomodoro';
import TodoList from '@/components/ToDo';
import Notes from '@/components/Notes';
import Summarizer from '@/components/Summarizer';
import BlocklistEditor from '@/components/BlockList';

// used for beta testing and feature implementation

export default function Beta() {
  return (
    <>
      <BlocklistEditor />
      <Summarizer />
      <PomodoroTimer />
      <TodoList />
      <Notes />
    </>
  )
}
