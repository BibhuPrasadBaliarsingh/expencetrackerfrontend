import { useContext, useEffect, useState } from "react"
import logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import Navlist from "./Navlist"
import { FaBars, FaUser } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"
import AuthContext from "../../context/AuthContext"
import { toast } from "react-toastify"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const navigate = useNavigate()

  const { user, logout, loading, setIsLogin } = useContext(AuthContext)
  // console.log(user)
  
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const handleLogout = () => {
    logout()
    toast.success("User Logged out")
    navigate("/")
    setClicked(false) // mobile menu close
    setAvatarOpen(false)
  }
  
  const handleMobileClose = () => {
    setClicked(false)
    setAvatarOpen(false)
  }
  if (loading) return null

  return (
    <nav
      className={`
        fixed top-0 z-50 w-full
        flex items-center justify-between
        px-6 py-4
        transition-all duration-300
        ${scrolled
          ? "bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md"
          : "bg-transparent"
        }
      `}
    >
      {/* Logo */}
      <Link to="/" onClick={handleMobileClose}>
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="w-10 rounded-full hover:scale-105 transition"
          />
          <h4 className="text-teal-500 dark:text-gray-200 text-2xl font-semibold">
            Spend<span className="text-yellow-400">Wise</span>
          </h4>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden lg:flex">
        <Navlist />
      </div>

      {/* Desktop Auth */}
      <div className="hidden lg:flex items-center gap-3 relative">
        {!user ? (
          <>
            <Link to="/login" onClick={()=>setIsLogin(true)}>
              <button className="px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                Sign in
              </button>
            </Link>
            <Link to="/login" onClick={()=>setIsLogin(false)}>
              <button className="px-4 py-2 rounded-lg font-semibold text-white
                               bg-gradient-to-r from-teal-700 to-teal-300
                               hover:scale-105 transition">
                Get Started Free
              </button>
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setAvatarOpen((prev) => !prev)}
              className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl text-gray-700 dark:text-gray-200 transition hover:shadow-lg"
            >
              {user.profile_img ? (
                <img
                  src={user.profile_img}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser />
              )}
            </button>

            {avatarOpen && (
              <div className="absolute right-0 mt-3 w-44 rounded-xl bg-white dark:bg-[#111c33] border border-gray-200 dark:border-gray-700 shadow-lg py-2">
                <Link
                  to="/dashboard"
                  onClick={() => setAvatarOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="lg:hidden text-2xl cursor-pointer">
        {clicked ? (
          <IoCloseSharp onClick={() => setClicked(false)} />
        ) : (
          <FaBars onClick={() => setClicked(true)} />
        )}
      </div>

      {/* Mobile Dropdown */}
      {clicked && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center py-6 gap-6 lg:hidden">

          {/* Nav Links */}
          <ul className="flex flex-col items-center gap-5 text-lg font-semibold text-blue-700 dark:text-blue-400 capitalize">
            <li onClick={handleMobileClose}>
              <Link to="/about">About</Link>
            </li>
            <li onClick={handleMobileClose}>
              <Link to="/features">Features</Link>
            </li>
            <li onClick={handleMobileClose}>
              <Link to="/reviews">Reviews</Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex flex-col gap-4 w-[80%]">
              <Link to="/login" onClick={()=>{setIsLogin(true); handleMobileClose()}}>
                <button className="w-full px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                  Sign in
                </button>
              </Link>
              <Link to="/login" onClick={()=>{setIsLogin(false); handleMobileClose()}}>
              <button className="w-full px-4 py-2 rounded-lg font-semibold text-white
                                 bg-gradient-to-r from-teal-700 to-teal-300
                                 hover:scale-105 transition">
                Get Started Free
              </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-[80%]">
              <button onClick={handleLogout} className="w-full px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                Logout
              </button>
              <Link to="/dashboard" onClick={handleMobileClose}>
                <button className="w-full px-4 py-2 rounded-lg font-semibold text-white
                                 bg-gradient-to-r from-teal-700 to-teal-300
                                 hover:scale-105 transition">
                  Dashboard
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
