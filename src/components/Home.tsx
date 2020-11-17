import React, { useCallback, useEffect, useState } from 'react'
import { BaseLink } from 'webnative/fs/types'
import { useAuth } from '../hooks'
import Sidebar from './Sidebar'
import Editor from './Editor'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<BaseLink[]>([])
  const [currentNote, setCurrentNote] = useState<BaseLink>()
  const [content, setContent] = useState<string>('')

  const { fs } = useAuth()

  const listNotes = useCallback(async () => {
    if (!fs || !fs.appPath) return

    console.log(`📚 listing notes`)
    const linksObject = await fs.ls(fs.appPath())
    const links = Object.entries(linksObject)
    setNotes(
      links.map(([_, link]) => {
        return link
      })
    )
  }, [fs])

  const createNote = async () => {
    if (!fs || !fs.appPath) return

    console.log(`📝 Creating new note`)
    let fileName = 'Untitled'
    let num = 0
    while (await fs.exists(fs.appPath(`${fileName}.md`))) {
      num++
      fileName = `Untitled ${num}`
    }

    try {
      await fs.add(fs.appPath(`${fileName}.md`), '')
      await fs.publish()
      await listNotes()
      setCurrentNote(notes.find((note) => note.name === `${fileName}.md`))
      setContent('')
    } catch (e) {
      console.error(e)
    }
  }

  const loadNote = async (note: BaseLink) => {
    if (!fs || !fs.appPath) return

    setLoading(true)
    console.log(`📖 loading file: ${note.name}`)
    const fileContent = await fs.read(fs.appPath(note.name))
    setCurrentNote(note)
    setContent(`${fileContent}`)
    setLoading(false)
  }

  const saveCurrentNote = async (content: string) => {
    if (!fs || !fs.appPath || !currentNote) return

    console.log(`📝 Saving note ${currentNote.name}`)
    setLoading(true)
    try {
      await fs.write(fs.appPath(currentNote.name), content)
      await fs.publish()
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const renameNote = async (note: BaseLink) => {
    if (!fs || !fs.appPath || !currentNote) return

    console.log(`➡️ rename ${currentNote.name} to ${note.name}`)
    setLoading(true)
    try {
      await fs.mv(fs.appPath(currentNote.name), fs.appPath(note.name))
      fs.publish()
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const deleteNote = async (note: BaseLink) => {}

  useEffect(() => {
    async function loadNotes() {
      if (!fs || !fs.appPath) return

      const appPath = fs.appPath()
      if (await fs.exists(appPath)) {
        await listNotes()
      } else {
        await fs.mkdir(appPath)
        await fs.publish()
      }
      setLoading(false)
    }

    loadNotes()
  }, [fs, listNotes, setLoading])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-600 break-all left-0 py-8 px-4 right-0 sticky">
        <h1>Notes</h1>
      </header>
      <main className="flex flex-auto">
        <Sidebar
          notes={notes}
          current={currentNote}
          addNote={createNote}
          loadNote={loadNote}
          renameNote={renameNote}
          deleteNote={deleteNote}
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
