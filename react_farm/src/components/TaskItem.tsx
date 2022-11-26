import React, { memo } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { Task } from '../types/types'
import { useAppDispatch } from '../app/hooks'
import { setEditedTask } from '../slices/appSlice'
import { useMutateTask } from '../hooks/useMutateTask'

const TaskItemMemo = ({
  id,
  title,
  description,
  setId,
}: Task & { setId: React.Dispatch<React.SetStateAction<string>> }) => {
  const dispatch = useAppDispatch()
  const { deleteTaskMutation } = useMutateTask()

  return (
    <li>
      <span className="cursor-pointer font-bold" onClick={() => setId(id)}>
        {title}
      </span>
      <div className="float-right ml-20 flex">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            dispatch(
              setEditedTask({
                id: id,
                title: title,
                description: description,
              })
            )
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteTaskMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}

export const TaskItem = memo(TaskItemMemo)
