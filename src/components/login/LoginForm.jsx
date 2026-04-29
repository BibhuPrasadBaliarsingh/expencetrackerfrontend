import { useContext, useState } from 'react'
import { FaApple, FaArrowRight, FaGoogle, FaEnvelope, FaLock, FaEye } from 'react-icons/fa'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { toast, ToastContainer } from 'react-toastify'

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = loginData
    // console.log(email,password)

    const [showPassword, setShowPassword] = useState(false)

    const { login } = useContext(AuthContext)
    const navigate = useNavigate();



    const handleInput = (e) => {
        const { name, value } = e.target

        setLoginData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("All fields are required")
            return
        }

        const response = login({ email, password })

        if (response.success) {
            toast.success("Login successful 🎉")

            setTimeout(() => {
                navigate("/dashboard")
            }, 1200)

        } else {
            toast.error(response.message)
        }
    }



    return (
        <div className="w-full mt-4">

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>

                {/* Email */}
                <label className="text-sm font-medium" htmlFor='email'>Email</label>
                <div className="flex items-center justify-between rounded-xl px-4 py-3 focus-within:border-2 focus-within:border-teal-500 focus-within:shadow-md focus-within:shadow-blue-300/40 gap-2">
                    <FaEnvelope className="text-slate-400" />
                    <input
                        id='email'
                        type="email"
                        placeholder="you@example.com"
                        className="outline-none w-full"
                        name='email'
                        value={email}
                        onChange={handleInput}
                    />
                </div>

                {/* Password */}
                <label className="text-sm font-medium">Password</label>
                <div className="flex items-center justify-between rounded-xl px-4 py-3 focus-within:border-2 focus-within:border-teal-500 focus-within:shadow-md focus-within:shadow-blue-300/40">
                    <FaLock className="text-slate-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="outline-none flex-1 px-2"
                        name='password'
                        value={password}
                        onChange={handleInput}
                    />
                    <FaEye className="text-slate-400 cursor-pointer" onClick={() => setShowPassword(prev => !prev)} />
                </div>

                {/* Remember / Forgot */}
                <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center gap-2 text-slate-500">
                        <input type="checkbox" />
                        Remember me
                    </label>

                    <a className="text-teal-600 font-semibold cursor-pointer">
                        Forgot password?
                    </a>
                </div>

                {/* Button */}
                <button className="w-full py-4 bg-teal-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                    Login <FaArrowRight />
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 text-slate-400 text-sm my-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span>Or continue with</span>
                <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Social buttons */}
            <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2
                           border rounded-xl py-2 hover:bg-yellow-500 transition">
                    <FaGoogle /> Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2
                           border rounded-xl py-2 hover:bg-yellow-500 transition">
                    <FaApple /> Apple
                </button>
            </div>

        </div>
    )
}

export default LoginForm
