import React from 'react'
import { LogoutIcon } from '@heroicons/react/outline'
import { useProcessAuth } from '../hooks/useProcessAuth'

export const Todo = () => {
  const { logout } = useProcessAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-600">
      <LogoutIcon
        onClick={logout}
        className="mt-1 mb-5 h-7 w-7 cursor-pointer text-blue-500"
      />
    </div>
  )
}