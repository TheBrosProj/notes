import PomodoroTimer from '@/components/Pomodoro';
import TodoList from '@/components/ToDo';
import Notes from '@/components/Notes';
import Summarizer from '@/components/Summarizer';

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
