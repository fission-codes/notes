import { useEffect, useState } from 'react'
import * as wn from 'webnative'
import FileSystem from 'webnative/fs'

wn.setup.debug({ enabled: true })

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
