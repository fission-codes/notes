import { useEffect, useState } from 'react'
import * as wn from 'webnative'
import FileSystem from 'webnative/fs/index'
import { FilePath } from 'webnative/path'

wn.setup.debug({ enabled: true })

export const notesDir = wn.path.directory("private", "Documents", "Notes")

export const notesPath = (fileName: string): FilePath => {
  const filePath = wn.path.file(fileName)
  return wn.path.combine(notesDir, filePath)
}

export function useAuth() {
  const [state, setState] = useState<wn.State>()
  let fs: FileSystem | undefined

  const authorise = () => {
    if (state) {
      wn.redirectToLobby(state.permissions)
    }
  }

  useEffect(() => {
    async function getState() {
      const result = await wn.initialise({
        permissions: {
          app: {
            name: 'Notes',
            creator: 'walkah',
          },
          fs: {
            private: [wn.path.directory("Documents", "Notes" )],
          },        
        },
      })
      setState(result)
    }

    getState()
  }, [])

  switch (state?.scenario) {
    case wn.Scenario.AuthSucceeded:
    case wn.Scenario.Continuation:
      fs = state.fs
      break
  }

  return { authorise, fs, state }
}
