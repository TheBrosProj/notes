import PomodoroTimer from '@/components/Pomodoro';
import TodoList from '@/components/ToDo';
import Notes from '@/components/Notes';
import CookieConsentSlide from '@/components/CookieConsent';

export default function Home() {

  return (
    <>
      <CookieConsentSlide />
      {/* <LoadPage> */}
      <PomodoroTimer />
      {/* <Summarizer /> */}
      <TodoList />
      <Notes />
      {/* </LoadPage> */}
    </>
  )
}
