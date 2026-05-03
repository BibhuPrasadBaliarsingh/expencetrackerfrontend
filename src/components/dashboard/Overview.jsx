import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import ExpensesList from './ExpensesList'
import GoalsList from './GoalsList'
import InvestmentsList from './InvestmentsList'

const Overview = () => {
  const [activeTab, setActiveTab] = useState('expenses')
  const { user, expenses, goals, investments } = useContext(AuthContext)

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
  const totalInvested = investments.reduce((sum, investment) => sum + Number(investment.investedAmount || 0), 0)
  const completedGoals = goals.filter((goal) => Number(goal.savedAmount) >= Number(goal.targetAmount)).length

  const tabItems = [
    { id: 'expenses', label: 'Expenses' },
    { id: 'goals', label: 'Goals' },
    { id: 'investments', label: 'Investments' },
  ]

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
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33] p-6 shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-teal-500">Overview</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              Hello, {user?.name || 'there'}.
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Your dashboard summary is ready. View your current expenses, goals and investments at a glance.
            </p>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-3 lg:w-auto">
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1220] p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Total spent</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">₹{totalExpenses.toLocaleString()}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Across all expense entries</p>
            </div>
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1220] p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Investments</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">₹{totalInvested.toLocaleString()}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Money currently invested</p>
            </div>
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1220] p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Goals</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{goals.length}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{completedGoals} completed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111C33] p-3 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-[140px] rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-[#1A2A4F] hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 p-6 shadow-xl">
        {renderContent()}
      </section>
    </div>
  )
}

export default Overview
