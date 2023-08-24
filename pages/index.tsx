import PomodoroTimer from '@/components/Pomodoro';
import TodoList from '@/components/ToDo';
import Notes from '@/components/Notes';
import CookieConsentSlide from '@/components/CookieConsent';

export default function Home() {

// where magic happens

  return (
    <>
      <CookieConsentSlide />
      <PomodoroTimer />
      <TodoList />
      <Notes />
    </>
  )
}
