import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

function App() {

  return (
    <Routes>

      <Route path='/sign-up' element={<Signup />} />

      <Route path='/login' element={<Login />} />

      <Route path='/' element={<Login />} />

    </Routes>

  )
}

export default App
