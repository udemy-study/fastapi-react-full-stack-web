import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCsrfState, selectTask } from './slices/appSlice'
import axios from 'axios'
import { CsrfToken } from './types/types'
import { useAppSelector } from './app/hooks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import { Todo } from './components/Todo'

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
