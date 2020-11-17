import React from 'react'

import { BaseLink } from 'webnative/fs/types'

interface Props {
  notes: BaseLink[]
  current: BaseLink | undefined
  addNote: Function
  loadNote: Function
  renameNote: Function
  deleteNote: Function
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
            className="my-4 hover:bg-gray-200 cursor-pointer px-4 py-1"
            key={note.name}
            onClick={() => loadNote(note)}
          >
            <div className="flex group">
              <span className="flex-auto truncate">{note.name}</span>
              <span
                className="opacity-0 group-hover:opacity-100"
                onClick={() => console.log('rename')}
              >
                E
              </span>
              <span
                className="opacity-0 group-hover:opacity-100 ml-5"
                onClick={() => console.log('delete')}
              >
                D
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
