import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

const Dashboard_welcome = () => {
  const { user, expenses, goals, investments } = useContext(AuthContext)
  const [value, setValue] = useState(new Date());

  const income = Number(user?.income ?? 0)
  const hasIncome = income > 0
  const needs = hasIncome ? income * 0.5 : 0
  const wants = hasIncome ? income * 0.3 : 0
  const savings = hasIncome ? income * 0.2 : 0

  const formatCurrency = (value) => Number(value || 0).toLocaleString('en-IN')

  const expenseCategory = expenses.reduce((acc, expense) => {
    const { category, amount } = expense

    if (!acc[category]) {
      acc[category] = 0
    }

    acc[category] += Number(amount)

    return acc
  }, {})

  const categoryTable = Object.entries(expenseCategory)
  // console.log(expenseCategory)


  const goalTable = goals?.map(goal => {
    const progress = (goal.savedAmount / goal.targetAmount) * 100

    const today = new Date()
    const endDate = new Date(goal.lastdate)

    const monthsLeft = Math.max(
      (endDate.getFullYear() - today.getFullYear()) * 12 +
      (endDate.getMonth() - today.getMonth()),
      1
    )

    const remainingAmount = goal.targetAmount - goal.savedAmount
    const monthlyRequired = remainingAmount > 0
      ? remainingAmount / monthsLeft
      : 0

    return {
      ...goal,
      progress,
      monthlyRequired
    }
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
  const totalInvested = investments.reduce((sum, investment) => sum + Number(investment.investedAmount || 0), 0)
  const activeGoals = goals?.length || 0

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">

      <div className="rounded-[2rem] bg-white/90 dark:bg-[#0B1220]/90 border border-slate-200 dark:border-white/10 shadow-2xl p-8 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row justify-between gap-6 items-start">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-500 mb-3">SpendWise Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Hello, {user?.name || 'Investor'}.
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400 max-w-xl">
              Track your expenses, investments, goals, and savings in one beautiful place. Your financial insights are now easy to read and act on.
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 dark:bg-white/10 p-6 shadow-xl w-full sm:w-auto flex flex-col items-center justify-center gap-4">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-400/80">Current time</p>
            <div className="rounded-full bg-white/20 dark:bg-white/10 p-4">
              <Clock value={value} size={140} />
            </div>
            <p className="text-sm text-teal-400/80 mt-1">{value.toDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111C33] p-5 shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Expenses</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">₹{formatCurrency(totalExpenses)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Based on all added expenses</p>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111C33] p-5 shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">Investments</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">₹{formatCurrency(totalInvested)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Money currently invested</p>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111C33] p-5 shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">Active Goals</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{activeGoals}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Goals you are currently tracking</p>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111C33] p-5 shadow-sm">
            {hasIncome ? (
              <>
                <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Income</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">₹{formatCurrency(income)}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Recommended budget split by 50/30/20</p>
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">No income added yet</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Add your monthly income so SpendWise can show your budget breakdown.</p>
                <Link
                  to="/dashboard/profile"
                  className="inline-flex items-center justify-center rounded-full bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:bg-teal-500 transition"
                >
                  Add Income
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.9fr] gap-6">
        <div className="space-y-6">
          {hasIncome && (
            <div className="rounded-3xl bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 shadow-xl p-6">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Monthly Budget</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Your target spending split</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Needs', value: needs, color: 'from-teal-500 to-cyan-400' },
                  { label: 'Wants', value: wants, color: 'from-indigo-500 to-violet-500' },
                  { label: 'Savings', value: savings, color: 'from-emerald-500 to-lime-500' },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-50 dark:bg-[#0B1220] p-4 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-slate-700 dark:text-slate-200">{item.label} ({item.label === 'Needs' ? '50%' : item.label === 'Wants' ? '30%' : '20%'})</span>
                      <span className="font-semibold text-slate-900 dark:text-white">₹{formatCurrency(item.value)}</span>
                    </div>
                    <div className="mt-3 h-3 rounded-full bg-slate-200 dark:bg-[#111C33] overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.label === 'Needs' ? 50 : item.label === 'Wants' ? 30 : 20}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-3xl bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Expense by Category</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Quick view of your spending categories</p>
              </div>
            </div>
            <div className="space-y-3">
              {categoryTable.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">No expenses added yet.</p>
              ) : (
                categoryTable.map(([category, total]) => (
                  <div key={category} className="flex items-center justify-between rounded-3xl bg-slate-50 dark:bg-[#0B1220] p-4 border border-slate-200 dark:border-white/10">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{category}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{((total / (totalExpenses || 1)) * 100).toFixed(0)}% of spending</p>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white">₹{formatCurrency(total)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Investments</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your current investment snapshot</p>
              </div>
            </div>
            <div className="space-y-4">
              {investments?.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">You haven't added any investments yet.</p>
              ) : (
                investments.map((investment) => (
                  <div key={investment.id} className="rounded-3xl bg-slate-50 dark:bg-[#0B1220] p-4 border border-slate-200 dark:border-white/10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{investment.title || investment.investmentType}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{investment.investmentType} • {investment.investmentDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">₹{formatCurrency(investment.investedAmount)}</p>
                        <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">ROI {investment.interestRate ?? 0}%</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Goal Progress</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Track how close your goals are</p>
              </div>
            </div>
            <div className="space-y-4">
              {goalTable?.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">No goals created yet.</p>
              ) : (
                goalTable.map(goal => (
                  <div key={goal.id} className="rounded-3xl bg-slate-50 dark:bg-[#0B1220] p-4 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{goal.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Target ₹{formatCurrency(goal.targetAmount)}</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{goal.progress.toFixed(1)}%</p>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-[#111C33] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500" style={{ width: `${Math.min(goal.progress, 100)}%` }} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Saved ₹{formatCurrency(goal.savedAmount)}</span>
                      <span>Needs ₹{formatCurrency(goal.monthlyRequired)}/mo</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard_welcome
