import React, { useCallback, useEffect, useState } from 'react'
import { BaseLink, BaseLinks } from 'webnative/fs/types'
import { useAuth, notesDir, notesPath } from '../hooks'
import Sidebar from './Sidebar'
import Editor from './Editor'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<BaseLink[]>([])
  const [currentNote, setCurrentNote] = useState<BaseLink>()
  const [content, setContent] = useState<string>('')

  const { fs } = useAuth()

  const listNotes = useCallback(async () => {
    if (!fs) return

    console.log(`📚 listing notes`)
    const linksObject: BaseLinks = await fs.ls(notesDir)
    const links = Object.entries(linksObject)
    setNotes(
      links.map(([_, link]) => {
        return link
      })
    )
  }, [fs])

  const createNote = async () => {
    if (!fs) return

    console.log(`📝 Creating new note`)
    let fileName = 'Untitled'
    let num = 0
    while (await fs.exists(notesPath(`${fileName}.md`))) {
      num++
      fileName = `Untitled ${num}`
    }

    try {
      await fs.add(notesPath(`${fileName}.md`), content)
      await fs.publish()
      await listNotes()
      setCurrentNote(notes.find((note) => note.name === `${fileName}.md`))
      setContent('')
    } catch (e) {
      console.error(e)
    }
  }

  const loadNote = async (note: BaseLink) => {
    if (!fs) return

    setLoading(true)
    console.log(`📖 loading file: ${note.name}`)
    const fileContent = await fs.read(notesPath(note.name))
    setCurrentNote(note)
    setContent(`${fileContent}`)
    setLoading(false)
  }

  const saveCurrentNote = async (content: string) => {
    if (!fs || !currentNote) return

    console.log(`📝 Saving note ${currentNote.name}`)
    setLoading(true)
    try {
      await fs.write(notesPath(currentNote.name), content)
      await fs.publish()
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    async function loadNotes() {
      if (!fs) return

      if (await fs.exists(notesDir)) {
        await listNotes()
      } else {
        await fs.mkdir(notesDir)
        await fs.publish()
      }
      setLoading(false)
    }

    loadNotes()
  }, [fs, listNotes, setLoading])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-2xl bg-base-200 break-all left-0 py-8 px-4 right-0 sticky">
        <h1 className="tdc-base-300 text-base-500 dark:text-base-400">Notes</h1>
      </header>
      <main className="flex flex-auto">
        <Sidebar
          notes={notes}
          current={currentNote}
          addNote={createNote}
          loadNote={loadNote}
        />
        {currentNote && (
          <Editor
            content={content}
            saveNote={saveCurrentNote}
            loading={loading}
          />
        )}
      </main>
    </div>
  )
}

export default Home
