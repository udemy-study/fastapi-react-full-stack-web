import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCsrfState, selectTask } from './slices/appSlice'
import axios from 'axios'
import { CsrfToken } from './types/types'
import { useAppSelector } from './app/hooks'

function App() {
  const csrf = useAppSelector(selectCsrfState)
  useEffect(() => {
    const getCsrfToken = async () => {
      const res = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrftoken`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
      console.log(res.data.csrf_token)
    }
    getCsrfToken()
  }, [csrf])

  const task = useSelector(selectTask)
  const csrfState = useSelector(selectCsrfState)
  console.log('task:', task, csrfState)
  return <div>{`task: ${task}`}</div>
}

export default App
