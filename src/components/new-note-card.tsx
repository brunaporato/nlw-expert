import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteSaved: (content: string) => void
}

export function NewNoteCard({ onNoteSaved }: NewNoteCardProps) {
  const [isOnboardShown, setIsOnboardShown] = useState(true)
  const [content, setContent] = useState('')

  function handleHideOnboard() {
    setIsOnboardShown(false)
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
    if (e.target.value === '') {
      setIsOnboardShown(true)
    }
  }

  function handleSaveNote(e: React.FormEvent) {
    e.preventDefault()
    onNoteSaved(content)

    setContent('')
    setIsOnboardShown(true)

    toast.success('Successfully created note!')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">Add new note</span>
        <p className="text-sm leading-6 text-slate-400">
          Record an audio note that will be automatically converted to text.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form onSubmit={handleSaveNote} className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                Add new note
              </span>
              {isOnboardShown ? (
                <p className="text-sm leading-6 text-slate-400">
                  Start{' '}
                  <button className="font-medium text-lime-400 hover:underline">
                    recording an audio note
                  </button>{' '}
                  or simply{' '}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleHideOnboard}
                  >
                    type your note
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
            >
              Save note
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
