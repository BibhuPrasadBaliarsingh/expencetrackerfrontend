import React, { useContext } from 'react'
import { FaAward, FaCheck, FaGlobe, FaHeart, FaUsers } from 'react-icons/fa'
import { FaRightFromBracket } from 'react-icons/fa6'
import AboutCards from '../utils/AboutCards'
import AuthContext from '../../context/AuthContext'

const About = () => {

  const {sectionRefs} = useContext(AuthContext)

  // console.log(sectionRefs)

  return (
    <section ref={sectionRefs?.about} className="bg-gradient-to-b from-[#0E1A2D] to-[#0B1220] py-28">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block bg-green-600/20 text-green-400 px-4 py-1 rounded-full text-sm mb-6">
            About SpendWise
          </span>

          <h2 className="text-5xl font-bold text-white leading-tight">
            We Believe Everyone <br />
            Deserves{" "}
            <span className="text-green-400">Financial Freedom</span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            SpendWise was born from a simple idea: managing money shouldn't be
            complicated. Our team of financial experts and tech innovators came
            together to create an intelligent platform that understands your
            unique financial situation.
          </p>

          <p className="mt-4 text-gray-300 text-lg leading-relaxed">
            Whether you're living paycheck to paycheck or planning for early
            retirement, our AI adapts to your needs, providing personalized
            guidance that helps you make smarter decisions every day.
          </p>

          {/* CHECKLIST */}
          <ul className="mt-10 space-y-4">
            <li className="flex items-center gap-3 text-gray-200">
              <span className='p-2 rounded-full bg-green-600'><FaCheck /></span>
              Personalized recommendations based on your income and goals
            </li>
            <li className="flex items-center gap-3 text-gray-200">
              <span className='p-2 rounded-full bg-green-600'><FaCheck /></span>
              Real-time tracking with intelligent categorization
            </li>
            <li className="flex items-center gap-3 text-gray-200">
              <span className='p-2 rounded-full bg-green-600'><FaCheck /></span>
              Secure, bank-level encryption for your peace of mind
            </li>
          </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="grid grid-cols-2 gap-8">

          {/* Cards */}
          <AboutCards
            icon={<FaUsers />}
            value="50,000+"
            label="Happy Users"
          />

          <AboutCards
            icon={<FaAward />}
            value="$2.5M+"
            label="Money Saved"
          />

          <AboutCards
            icon={<FaGlobe />}
            value="30+"
            label="Countries"
          />

          <AboutCards
            icon={<FaHeart />}
            value="99%"
            label="Satisfaction"
          />
        </div>

      </div>

      {/* CEO Message */}
      <div className="flex justify-center py-20">
        <div className="max-w-4xl bg-gray-200 rounded-3xl px-16 py-14 text-center shadow-xl">
          <p className="text-2xl italic text-gray-900 leading-relaxed">
            “Our mission is to democratize financial intelligence. We want to give
            everyone—regardless of their income level—access to the same quality
            of financial guidance that was once reserved for the wealthy.”
          </p>

          <div className="mt-10">
            <p className="text-gray-600 text-sm">
              Founder & CEO, SpendWise
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
