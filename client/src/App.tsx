import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Layout from './layout/Layout'
import Profile from './pages/profile/Profile'

function App() {

  return (
    <Routes>
      
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/login' element={<Login />} />


      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='profile' element={<Profile />} />
      </Route>

    </Routes>

  )
}

export default App
