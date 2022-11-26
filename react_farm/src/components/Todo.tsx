import React, { useState } from 'react'
import { LogoutIcon } from '@heroicons/react/outline'
import { useProcessAuth } from '../hooks/useProcessAuth'
import { useProcessTask } from '../hooks/useProcessTask'
import { useQueryUser } from '../hooks/useQueryUser'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { TaskItem } from './TaskItem'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useQuerySingleTask } from '../hooks/useQuerySingleTask'
import { setEditedTask, selectTask } from '../slices/appSlice'

export const Todo = () => {
  const [id, setId] = useState('')
  const { logout } = useProcessAuth()
  const { data: dataUser } = useQueryUser()
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks()
  const { data: dataSingleTask, isLoading: isLoadingTask } =
    useQuerySingleTask(id)
  const dispatch = useAppDispatch()
  const editedTask = useAppSelector(selectTask)
  const { processTask } = useProcessTask()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-600">
      <div className="flex items-center">
        <ShieldCheckIcon className="mr-3 h-8 w-8 cursor-pointer text-green-500" />
        <span className="text-center text-3xl font-extrabold">CRUD tasks</span>
      </div>
      <p className="my-3 text-sm">{dataUser?.email}</p>

      <LogoutIcon
        onClick={logout}
        className="mt-1 mb-5 h-7 w-7 cursor-pointer text-blue-500"
      />
      <form onSubmit={processTask}>
        <input
          className="mb-3 mr-3 border border-gray-300 px-3 py-2"
          placeholder="title ?"
          type="text"
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          value={editedTask.title}
        />
        <input
          className="mb-3 mr-3 border border-gray-300 py-2 px-3"
          placeholder="description ?"
          type="text"
          onChange={(e) =>
            dispatch(
              setEditedTask({ ...editedTask, description: e.target.value })
            )
          }
          value={editedTask.description}
        />
        <button
          className="mx-3 rounded bg-indigo-600 py-2 px-3 text-white disabled:opacity-40"
          disabled={!editedTask.title || !editedTask.description}
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
      {isLoadingTasks ? (
        <p>Loading...</p>
      ) : (
        <ul className="my-5">
          {dataTasks?.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              setId={setId}
            />
          ))}
        </ul>
      )}
      <h2 className="mt-3 font-bold">Selected Task</h2>
      {isLoadingTask && <p>Loading...</p>}
      <p className="my-1 text-sm text-blue-500">{dataSingleTask?.title}</p>
      <p className="text-sm text-blue-500">{dataSingleTask?.description}</p>
    </div>
  )
}
