import React from 'react';
import { BaseLink } from 'webnative/fs/types';

interface Props {
  notes: BaseLink[]
}

const Sidebar: React.FC<Props> = (props) => {
  const { notes } = props;

  return (
    <div>
      <button onClick={() => console.log('add note!')}>Add a note</button>
      {notes.map(note => {
        return <div>{note.name}</div>
      })}

    </div>
  )
}

export default Sidebar 