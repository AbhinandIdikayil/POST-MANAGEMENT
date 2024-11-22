import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Layout from './layout/Layout'
import Profile from './pages/profile/Profile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <Routes>

      <Route path='/sign-up' element={<Signup />} />
      <Route path='/login' element={<Login />} />


      <Route path='/' element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path='' element={<Home />} />
        <Route path='profile' element={<Profile />} />
      </Route>

    </Routes>

  )
}

export default App
