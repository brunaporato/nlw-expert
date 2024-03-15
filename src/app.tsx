import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'
import { toast } from 'sonner'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('@expertnotes:notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  })
  const [search, setSearch] = useState('')

  function onNoteSaved(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)
    localStorage.setItem('@expertnotes:notes', JSON.stringify(notesArray))
  }

  function onNoteRemoved(id: string) {
    const notesArray = notes.filter((note) => note.id !== id)

    setNotes(notesArray)
    localStorage.setItem('@expertnotes:notes', JSON.stringify(notesArray))
    toast.error('Note deleted.')
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value
    setSearch(query)
  }

  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
          note.content.toLowerCase().includes(search.toLowerCase()),
        )
      : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="NlW Expert" />
      <form action="" className="w-full">
        <input
          type="text"
          placeholder="Search your notes..."
          className="w-full bg-transparent outline-none text-3xl font-semibold tracking-tight placeholder:text-slate-500"
          onChange={handleSearch}
          value={search}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteSaved={onNoteSaved} />
        {filteredNotes &&
          filteredNotes.map((note) => {
            return (
              <NoteCard
                key={note.id}
                note={note}
                onNoteRemoved={onNoteRemoved}
              />
            )
          })}
      </div>
    </div>
  )
}
