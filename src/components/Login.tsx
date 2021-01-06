import React from 'react'
import { useAuth } from '../hooks'

const Login = () => {
  const { authorise } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 flex flex-auto flex-col items-center justify-center py-12 text-center">
        <h1 className="text-2xl">Notes</h1>
        <div className="max-w-xl mt-4 text-gray-300 dark:text-gray-400">
          Fission Notes is your web native note system
        </div>
        <button
          onClick={authorise}
          className="antialiased appearance-none font-semibold inline-block leading-normal px-5 py-3 relative rounded text-white tracking-wider transition-colors uppercase duration-500 ease-out focus:shadow-outline bg-purple mt-8 mx-auto text-sm"
        >
          <div className="flex items-center pt-px">
            <span className="mr-2 opacity-30 text-white w-4">
              <svg height="100%" width="100%" viewBox="0 0 98 94">
                <path
                  d="M30 76a12 12 0 110 11H18a18 18 0 010-37h26l-4-6H18a18 18 0 010-37c6 0 11 2 15 7l3 5 10 14h33a8 8 0 000-15H68a12 12 0 110-11h11a18 18 0 010 37H53l4 6h22a18 18 0 11-14 30l-3-4-10-15H18a8 8 0 000 15h12zm41-6l2 4 6 2a8 8 0 000-15H65l6 9zM27 25l-3-5-6-2a8 8 0 000 15h15l-6-8z"
                  fill="currentColor"
                  fill-rule="nonzero"
                ></path>
              </svg>
            </span>
            Sign in with Fission
          </div>
        </button>{' '}
        <div></div>
      </div>
    </div>
  )
}

export default Login
