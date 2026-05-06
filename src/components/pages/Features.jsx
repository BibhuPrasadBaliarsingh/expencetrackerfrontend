import React, { useContext } from 'react'
import { FaBell, FaBullseye, FaChartPie, FaWallet } from 'react-icons/fa'
import { FaArrowTrendUp, FaShield } from 'react-icons/fa6'
import FeaturesCards from '../utils/FeaturesCards'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Features = () => {
    const { setIsLogin, sectionRefs } = useContext(AuthContext)

    return (
        <>
            <div
                ref={sectionRefs?.features}
                className='w-full px-6 sm:px-12 lg:px-24 py-20 
                           bg-gray-50 dark:bg-[#0B1220]
                           flex flex-col items-center text-center'
            >

                {/* Tag */}
                <span className='rounded-full border 
                                 border-gray-300 dark:border-white/10
                                 px-4 py-2 text-sm
                                 bg-white dark:bg-[#111C33]
                                 text-gray-600 dark:text-gray-300
                                 shadow-sm'>
                    ✨ Why Choose ArthWise
                </span>

                {/* Heading */}
                <h1 className='mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold 
                               text-gray-800 dark:text-white leading-tight'>
                    Everything You Need to{" "}
                    <span className='text-teal-600 dark:text-teal-500'>
                        Master Your Finances
                    </span>
                </h1>

                {/* Paragraph */}
                <p className='mt-6 max-w-3xl 
                              text-gray-500 dark:text-gray-400 text-lg'>
                    From tracking daily expenses to planning long-term investments,
                    our intelligent platform adapts to your financial journey.
                </p>

                {/* Feature Cards */}
                <div className='mt-16 flex flex-wrap gap-6 justify-center'>
                    <FeaturesCards
                        icon={<FaWallet />}
                        heading="Smart Expense Tracking"
                        paragraph="Automatically categorize and track every expense. See where your money goes with intuitive visualizations."
                    />
                    <FeaturesCards
                        icon={<FaBell />}
                        heading="Personalized Notifications"
                        paragraph="Get timely alerts based on your spending patterns. Never miss a bill or overspend again."
                    />
                    <FeaturesCards
                        icon={<FaArrowTrendUp />}
                        heading="Investment Suggestions"
                        paragraph="AI-powered recommendations tailored to your income and risk tolerance. Grow your wealth smartly."
                    />
                    <FeaturesCards
                        icon={<FaBullseye />}
                        heading="Goal-Based Planning"
                        paragraph="Set financial goals and get a personalized roadmap. Whether it's a vacation or retirement, we've got you."
                    />
                    <FeaturesCards
                        icon={<FaChartPie />}
                        heading="Budget Analysis"
                        paragraph="Understand your needs vs wants. Get suggestions to optimize spending based on your salary."
                    />
                    <FeaturesCards
                        icon={<FaShield />}
                        heading="Secure & Private"
                        paragraph="Bank-level encryption keeps your data safe. Your financial information stays yours."
                    />
                </div>
            </div>

            {/* HOW IT WORKS SECTION */}
            <section className="py-20 bg-white dark:bg-[#111C33]">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-3xl sm:text-4xl font-semibold 
                                   text-gray-800 dark:text-white">
                        How It Works
                    </h2>

                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Get started in minutes and transform your financial life in three simple steps.
                    </p>

                    <div className="relative mt-20">

                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-7 left-0 right-0 
                                        h-[2px] bg-gray-200 dark:bg-white/10">
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">

                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="z-10 w-14 h-14 flex items-center justify-center
                                                rounded-full bg-teal-600 text-white font-semibold shadow-md">
                                    01
                                </div>
                                <h3 className="mt-6 text-lg font-semibold 
                                               text-gray-800 dark:text-white">
                                    Connect Your Accounts
                                </h3>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    Securely link your bank accounts and cards for automatic tracking.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="z-10 w-14 h-14 flex items-center justify-center
                                                rounded-full bg-teal-600 text-white font-semibold shadow-md">
                                    02
                                </div>
                                <h3 className="mt-6 text-lg font-semibold 
                                               text-gray-800 dark:text-white">
                                    Set Your Goals
                                </h3>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    Tell us your income, expenses, and what you're saving for.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="z-10 w-14 h-14 flex items-center justify-center
                                                rounded-full bg-teal-600 text-white font-semibold shadow-md">
                                    03
                                </div>
                                <h3 className="mt-6 text-lg font-semibold 
                                               text-gray-800 dark:text-white">
                                    Get AI Insights
                                </h3>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    Receive personalized suggestions and watch your wealth grow.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-16">
                        <Link to="/login" onClick={() => setIsLogin(false)}>
                            <button className="px-8 py-3 rounded-xl font-semibold
                                               bg-teal-600 hover:bg-teal-500
                                               text-white transition duration-300
                                               hover:scale-105 shadow-md">
                                Start Your Journey →
                            </button>
                        </Link>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Features