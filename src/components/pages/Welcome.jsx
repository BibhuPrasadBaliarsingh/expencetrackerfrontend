import React, { useContext} from 'react'
import Features from './Features'
import { FaBullseye, FaPiggyBank } from 'react-icons/fa'
import { FaArrowTrendUp } from 'react-icons/fa6'
import About from './About'
import Reviews from './Reviews'
import Footer from '../footer/Footer'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Contact from './Contact'

const Welcome = () => {
  const {setIsLogin} = useContext(AuthContext)

  return (
    <section className="bg-white dark:bg-black text-black dark:text-gray-200">
      <div className="min-h-screen bg-gradient-to-br from-[#0E1A2D] to-[#0B1220] flex items-center">

        {/* Container */}
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 text-center lg:text-left">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white text-sm w-fit mx-auto lg:mx-0">
              ✨ Smart financial management
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white leading-tight">
              Master your money,{" "}
              <span className="text-teal-200">Achieve your goals</span>
            </h1>

            <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0">
              Track expenses, get personalized savings suggestions and invest smarter.
              Let AI guide you to financial freedom based on your salary and lifestyle.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/login" onClick={() => setIsLogin(false)}>
                <button className="px-6 py-3 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Free Today
                </button>
              </Link>
              <button className="px-6 py-3 rounded-xl border border-white/50 text-white backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:scale-105">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-10 text-white">
              <div>
                <h3 className="text-2xl font-bold">50K+</h3>
                <p className="text-sm opacity-80">Active Users</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">₹2.5Cr+</h3>
                <p className="text-sm opacity-80">Money Saved</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">4.9★</h3>
                <p className="text-sm opacity-80">User Rating</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:block w-1/2 relative h-[500px]">

            {/* Card 1 */}
            <div className="absolute top-10 right-10 bg-white rounded-xl p-4 w-72 shadow-xl animate-[float_6s_ease-in-out_infinite]">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-yellow-200 rounded-xl">
                  <FaPiggyBank className="text-2xl text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Goal: Vacation</h4>
                  <p className="text-sm text-gray-500">78% complete</p>
                </div>
              </div>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-teal-500 rounded-full"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="absolute top-56 left-16 bg-white rounded-xl p-4 w-72 shadow-xl animate-[float_7s_ease-in-out_infinite]">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-green-200 rounded-xl">
                  <FaBullseye className="text-2xl text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">AI Suggestion</h4>
                  <p className="text-sm text-gray-500">Save ₹5000 more</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="absolute bottom-10 right-20 bg-white rounded-xl p-4 w-72 shadow-xl animate-[float_8s_ease-in-out_infinite]">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-teal-500 rounded-xl">
                  <FaArrowTrendUp className="text-2xl text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Monthly Overview</h4>
                  <p className="text-sm text-gray-500">January 2026</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      <Features/>

      <About/>

      <Reviews />

      <Contact/> 

      <Footer />
    </section>
  )
}

export default Welcome
