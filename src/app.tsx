import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

const note = {
  date: new Date(),
  content: 'Hello world',
}

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NlW Expert" />
      <form action="" className="w-full">
        <input
          type="text"
          placeholder="Search your notes..."
          className="w-full bg-transparent outline-none text-3xl font-semibold tracking-tight placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />
        <NoteCard note={note} />
      </div>
    </div>
  )
}
