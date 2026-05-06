import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { footerLinks } from "./footerData"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0E1A2D] to-[#0B1220] text-slate-300">
      
      {/* Upper Section */}
      <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-2 lg:grid-cols-5 gap-20">

        {/* Left */}
        <div className="lg:col-span-1 space-y-4">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="logo"
                className="w-10 rounded-full hover:scale-105 transition"
              />
              <h4 className="text-2xl font-semibold text-white">
                Spend<span className="text-yellow-400">Wise</span>
              </h4>
            </div>
          </Link>

          <p className="text-sm leading-relaxed">
            Empowering individuals to take control of their finances with
            intelligent tracking and personalized investment guidance.
          </p>

          
        </div>

        {/* Right */}
        <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-xl mb-4">{title}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link, index) => (
                  <li
                    key={index}
                    className="hover:text-white cursor-pointer text-lg transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-white/10" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p>© 2026 ArthWise. All rights reserved.</p>
        <p>
          Made with <span className="text-red-500">❤️</span> for your financial
          freedom
        </p>
      </div>
    </footer>
  )
}

export default Footer
