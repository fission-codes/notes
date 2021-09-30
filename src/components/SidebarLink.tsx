import React, { useRef, useState } from 'react'
import { BaseLink } from 'webnative/fs/types'
import { Edit3, Save, Trash } from 'react-feather'
import { useAuth } from '../hooks'
import * as wn from 'webnative'

interface Props {
  note: BaseLink
}

const SidebarLink: React.FC<Props> = (props) => {
  const renameInput = useRef<HTMLInputElement>(null)
  const { note } = props
  const [editMode, setEditMode] = useState(false)
  const { fs } = useAuth()

  const renameNote = async () => {
    if (!fs || !fs.appPath || !renameInput || !renameInput.current) return

    const newName = renameInput.current.value

    console.log(
      `➡️ rename ${fs.appPath(wn.path.file(note.name))} to ${fs.appPath(
        wn.path.file(newName)
      )}`
    )
    try {
      await fs.mv(
        fs.appPath(wn.path.file(note.name)),
        fs.appPath(wn.path.file(newName))
      )
      await fs.publish()
      setEditMode(false)
    } catch (e) {
      console.error(e)
    }
  }

  const deleteNote = async (note: BaseLink) => {
    if (!fs || !fs.appPath) return

    try {
      console.log(`🗑 deleting ${note.name}`)
      await fs.rm(fs.appPath(wn.path.file(note.name)))
      fs.publish()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex group">
      {editMode ? (
        <>
          <span className="flex-auto">
            <input
              ref={renameInput}
              className="w-full px-2"
              type="text"
              defaultValue={note.name}
            />
          </span>
          <span
            className="ml-5"
            onClick={async (e) => {
              e.stopPropagation()
              renameNote()
            }}
          >
            <Save />
          </span>
        </>
      ) : (
        <>
          <span className="flex-auto px-2 truncate">{note.name}</span>
          <span
            className="opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              setEditMode(true)
            }}
          >
            <Edit3 />
          </span>
          <span
            className="opacity-0 group-hover:opacity-100 ml-5"
            onClick={(e) => {
              e.stopPropagation()
              if (window.confirm('are you sure?')) {
                deleteNote(note)
              }
            }}
          >
            <Trash />
          </span>
        </>
      )}
    </div>
  )
}

export default SidebarLink
