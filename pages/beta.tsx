import PomodoroTimer from '@/components/Pomodoro';
import TodoList from '@/components/ToDo';
import Notes from '@/components/Notes';
import Summarizer from '@/components/Summarizer';

// used for beta testing and feature implementation

export default function Beta() {
  return (
    <>
        <Summarizer />
        <PomodoroTimer />
        <TodoList />
        <Notes />
    </>
  )
}
