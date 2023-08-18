import PomodoroTimer from '@/components/Pomodoro';
import TodoList from '@/components/ToDo';
import Notes from '@/components/Notes';
import Summarizer from '@/components/Summarizer';
// import LoadPage from '@/components/LoadPage';

export default function Home() {
  return (
    <>
      {/* <LoadPage> */}
        <PomodoroTimer />
        <Summarizer />
        <TodoList />
        <Notes />
      {/* </LoadPage> */}
    </>
  )
}
