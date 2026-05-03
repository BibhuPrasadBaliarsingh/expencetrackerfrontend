import React, { useContext, useState } from 'react'
import { FaArrowAltCircleRight, FaRegChartBar, FaReceipt, FaBullseye, FaPiggyBank, FaUserCircle, FaLightbulb } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { NavLink, Link, Outlet } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useContext(AuthContext)

  const dashboardItems = [
    { label: 'overview', icon: FaRegChartBar },
    { label: 'expense form', icon: FaReceipt },
    { label: 'goals', icon: FaBullseye },
    { label: 'invest', icon: FaPiggyBank },
    { label: 'profile', icon: FaUserCircle },
    { label: 'insights', icon: FaLightbulb },
  ]

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
        top-0 left-0 h-full w-72
        bg-white dark:bg-[#111C33]
        border-r border-gray-200 dark:border-white/10
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>

        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-teal-500">SpendWise</p>
            <h1 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">Dashboard</h1>
          </div>

          <button
            className="lg:hidden text-slate-700 dark:text-slate-200"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-6 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-4 rounded-3xl bg-teal-500/10 p-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-teal-200 dark:bg-teal-600 flex items-center justify-center text-2xl text-teal-700 dark:text-white">
              {user?.profile_img ? (
                <img
                  src={user.profile_img}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle />
              )}
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back</p>
              <p className="font-semibold text-lg text-slate-900 dark:text-white">{user?.name || 'User'}</p>
              {user?.email && <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>}
            </div>
          </div>
        </div>

        <nav className="px-4 py-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">Quick links</p>
          <div className="flex flex-col gap-2">
            {dashboardItems.map((item) => {
              const ItemIcon = item.icon
              return (
                <NavLink
                  key={item.label}
                  to={`/dashboard/${item.label}`}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-teal-600/10 hover:text-teal-700 dark:hover:text-white'
                    }`
                  }
                >
                  <span className="text-lg">
                    <ItemIcon />
                  </span>
                  <span>{item.label.replace('-', ' ')}</span>
                </NavLink>
              )
            })}
          </div>
        </nav>

        <div className="px-6 mt-auto pb-6">
          <div className="rounded-3xl bg-slate-100 dark:bg-white/5 p-4 border border-slate-200/70 dark:border-white/10">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Need help?</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Visit your profile page to update your details and keep your account safe.</p>
            <Link
              to="/dashboard/profile"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:bg-teal-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Edit profile
            </Link>
          </div>
        </div>
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
