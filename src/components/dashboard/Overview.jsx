import React, { useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import ExpensesList from './ExpensesList'
import GoalsList from './GoalsList'
import InvestmentsList from './InvestmentsList'

const Overview = () => {
  const [activeTab, setActiveTab] = useState("expenses");

  const renderContent = () => {
    switch (activeTab) {
      case "expenses":
        return <ExpensesList />;
      case "goals":
        return <GoalsList />;
      case "investments":
        return <InvestmentsList />;
      default:
        return null;
    }
  };

  // console.log(total)

  return (
    <>
      <div className="flex dark:bg-[#0B1220] p-1 rounded-xl w-fit">

        {["expenses", "goals", "investments"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all
        ${activeTab === tab
                ? "bg-teal-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}

      </div>

      <div className="mt-6">
        {renderContent()}
      </div>
    </>
  )
}

export default Overview
