import React, { useContext, useState } from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { Link, Outlet} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
// import { Menu, X } from 'lucide-react'

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useContext(AuthContext)
  //   console.log(user)

  const dashboardItems = ["overview", "expense form", "goals", "invest", "profile", "insights"]

  return (
    <div className="flex h-[88vh] bg-gray-50 dark:bg-[#0B1220] text-gray-900 dark:text-white overflow-hidden">

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static z-50
        top-0 left-0 h-full w-64
        bg-white dark:bg-[#111C33]
        border-r border-gray-200 dark:border-white/10
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>

        <div className="flex items-center justify-between p-6">
          <h1 className="text-xl font-bold text-teal-500">
            {user?.name}
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={22} />
          </button>
        </div>

        <ul className="flex flex-col gap-3 px-4 mt-6 capitalize">
          {dashboardItems.map((item) => (
            <Link
              key={item}
              to={`/dashboard/${item}`}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-xl
              hover:bg-teal-600 hover:text-white
              transition-all duration-200"
            >
              {item.replace("-", " ")}
            </Link>
          ))}
        </ul>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4
        bg-white dark:bg-[#0E1A2D]
        border-b border-gray-200 dark:border-white/10">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition lg:hidden"
          >
            <FaArrowAltCircleRight size={20} />
          </button>

          <h2 className="text-lg font-semibold">
            <Link to="/dashboard">
              Dashboard
            </Link>
          </h2>
        </div>

        {/* Outlet Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white dark:bg-[#111C33]
          rounded-2xl shadow-lg p-6 min-h-[80vh]">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
