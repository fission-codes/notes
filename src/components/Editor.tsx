import React, { useEffect, useState } from "react";

interface Props {
  loading: boolean,
  content: string,
  saveNote: Function
}

const Editor: React.FC<Props> = (props) => {
  const { loading, content, saveNote } = props;
  const [value, setValue] = useState<string>()

  useEffect(() => {
    setValue(content)
  }, [content]);

  return (
    <div className="w-3/4 p-4">
      <div className="flex justify-end">
        <button className="btn" onClick={() => saveNote(value)}>
          Save
        </button>
      </div>
      <textarea 
        className="w-full h-full font-mono outline-none border-none p-8" 
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={loading}
      />
    </div>
  )
};

export default Editor;
