import React, { useState } from 'react'
import { BaseLink } from 'webnative/fs/types'
import { Edit3, Save, Trash } from 'react-feather'
import { useAuth } from '../hooks'

interface Props {
  note: BaseLink
}

const SidebarLink: React.FC<Props> = (props) => {
  const { note } = props
  const [editMode, setEditMode] = useState(false)
  const { fs } = useAuth()

  const renameNote = async (newName: string) => {
    if (!fs || !fs.appPath) return

    console.log(`➡️ rename ${note.name} to ${newName}`)
    try {
      await fs.mv(fs.appPath(note.name), fs.appPath(newName))
      fs.publish()
    } catch (e) {
      console.error(e)
    }
  }

  const deleteNote = async (note: BaseLink) => {
    if (!fs || !fs.appPath) return

    try {
      await fs.rm(fs.appPath(note.name))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex group">
      {editMode ? (
        <>
          <input type="text" defaultValue={note.name} />
          <span
            onClick={async (e) => {
              console.log('save!')
              setEditMode(false)
              renameNote('')
            }}
          >
            <Save />
          </span>
        </>
      ) : (
        <>
          <span className="flex-auto truncate">{note.name}</span>
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
