import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { useAuth } from './hooks'

function App() {
  const { state } = useAuth()

  if (state) {
    if (state?.authenticated) {
      return <Home />
    } else {
      return <Login />
    }
  }
  return <div>Loading...</div>
}

export default App
