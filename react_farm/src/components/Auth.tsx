import React from 'react'
import { RefreshIcon } from '@heroicons/react/solid'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import { useProcessAuth } from '../hooks/useProcessAuth'

export const Auth = () => {
  const {
    pw,
    setPw,
    email,
    setEmail,
    isLogin,
    setIsLogin,
    registerMutation,
    loginMutation,
    processAuth,
  } = useProcessAuth()

  if (registerMutation.isLoading || loginMutation.isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="font-mono text-xl text-gray-600">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-600">
      <div className="flex items-center">
        <BadgeCheckIcon className="mr-2 h-8 w-8 text-blue-500" />
        <span className="text-center text-3xl font-extrabold">
          FARM Stack web app
        </span>
      </div>
      <h2 className="my-6">{isLogin ? 'Login' : 'create a new account'}</h2>
      <form onSubmit={processAuth}>
        <div>
          <input
            className="mb-3 border border-gray-300 px-3 py-2 text-sm"
            name="email"
            type="type"
            autoFocus
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className="mb-3 border border-gray-300 px-3 py-2 text-sm"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
          />
        </div>
        <div className="my-2 flex justify-center">
          <button
            className="rounded bg-indigo-600 py-2 px-4 text-white disabled:opacity-40"
            disabled={!email || !pw}
            type="submit"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </form>
      <RefreshIcon
        onClick={() => setIsLogin(!isLogin)}
        className="my-2 h-8 w-8 cursor-pointer text-blue-500"
      />
    </div>
  )
}
