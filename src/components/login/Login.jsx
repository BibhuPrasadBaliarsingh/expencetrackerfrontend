import { useContext } from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import AuthContext from '../../context/AuthContext'

const Login = () => {
  const { isLogin, setIsLogin } = useContext(AuthContext)

  return (
    <div className='bg-gradient-to-br from-[#0E1A2D] to-[#0B1220] w-screen py-24 flex flex-col gap-4 items-center justify-center'>
      
      <div className='max-w-md bg-white text-gray-800 rounded-3xl flex flex-col items-center p-8 gap-3'>
        <h2 className='text-2xl font-semibold'>Welcome Back</h2>
        <p>Sign in to your account or create a new one</p>

        <div className='flex bg-slate-100 gap-5 p-1 rounded-lg'>
          <button
            className={`${isLogin ? "bg-white" : ""} px-16 py-2 rounded-lg`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            className={`${!isLogin ? "bg-white" : ""} px-16 py-2 rounded-lg`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? <LoginForm /> : <RegistrationForm/>}
      </div>

      <p className='text-center text-sm text-slate-400'>
        By continuing, you acknowledge that you have read and understood our
        <span className='text-yellow-500 hover:underline underline-offset-2'>
          <br />Privacy Policy. 
        </span>
      </p>
    </div>
  )
}

export default Login
