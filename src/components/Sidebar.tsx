import React from 'react'
import { BaseLink } from 'webnative/fs/types'
import SidebarLink from './SidebarLink'

interface Props {
  notes: BaseLink[]
  current: BaseLink | undefined
  addNote: Function
  loadNote: Function
}

const Sidebar: React.FC<Props> = (props) => {
  const { notes, addNote, loadNote } = props

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <button className="btn" onClick={() => addNote()}>
        Add a note
      </button>
      <ul>
        {notes.map((note) => (
          <li
            className="my-4 hover:bg-gray-200 cursor-pointer px-2 py-1"
            key={note.name}
            onClick={() => loadNote(note)}
          >
            <SidebarLink note={note} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
