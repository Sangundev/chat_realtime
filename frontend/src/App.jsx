import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/home/Home'
import Login from './page/login/Login'
import Signup from './page/signup/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'


function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
      <Route path='/' element={authUser ? <Home />: <Navigate to={"/Login"} />  } />
      <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
      <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
