import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

const Dashboard_welcome = () => {
  const { user, expenses, goals } = useContext(AuthContext)
  const [value, setValue] = useState(new Date());

  const income = Number(user?.income) || 0;
  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;

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

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">

      {/* Top Section: Name + Clock */}
      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-2xl font-semibold">
            Welcome, {user?.name}
          </h1>
          <p className="text-sm text-gray-500">
            Here’s your financial dashboard
          </p>
        </div>

        <div className="bg-white dark:bg-[#111C33] 
                      rounded-2xl shadow-md p-4">
          <Clock value={value} size={120} />
        </div>

      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Budget Table */}
        {user?.income && (
          <div className="bg-white dark:bg-[#111C33] 
                        rounded-2xl shadow-md p-6">

            <h3 className="text-lg font-semibold mb-4">
              Monthly Budget
            </h3>

            <table className="w-full text-sm">

              <thead className="text-left text-gray-500 border-b border-gray-200 dark:border-white/10">
                <tr>
                  <th className="py-3 font-medium">Category</th>
                  <th className="py-3 font-medium text-right">Amount</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-white/10">

                <tr>
                  <td className="py-4">Needs (50%)</td>
                  <td className="py-4 text-right font-semibold">
                    ₹ {needs.toLocaleString()}
                  </td>
                </tr>

                <tr>
                  <td className="py-4">Wants (30%)</td>
                  <td className="py-4 text-right font-semibold">
                    ₹ {wants.toLocaleString()}
                  </td>
                </tr>

                <tr>
                  <td className="py-4">Savings (20%)</td>
                  <td className="py-4 text-right font-semibold">
                    ₹ {savings.toLocaleString()}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        )}

        {/* Expense Category Summary */}
        <div className="bg-white dark:bg-[#111C33] 
                      rounded-2xl shadow-md p-6">

          <h3 className="text-lg font-semibold mb-4">
            Expense by Category
          </h3>

          <table className="w-full text-sm">

            <thead className="text-left text-gray-500 border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="py-3 font-medium">Category</th>
                <th className="py-3 font-medium text-right">Total</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-white/10">

              {categoryTable.length === 0 ? (
                <tr>
                  <td className="py-4 text-gray-500">
                    No expenses added
                  </td>
                  <td />
                </tr>
              ) : (
                categoryTable.map(([category, total]) => (
                  <tr key={category}>
                    <td className="py-4">{category}</td>
                    <td className="py-4 text-right font-semibold">
                      ₹ {total.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

        {/* Investment Table */}
        <div className="bg-white dark:bg-[#111C33] 
                    rounded-2xl shadow-md p-6">

          <h3 className="text-lg font-semibold mb-4">
            Investments
          </h3>

          <table className="w-full text-sm">

            <thead className="text-left text-gray-500 border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="py-3 font-medium">Type</th>
                <th className="py-3 font-medium text-right">Amount</th>
                <th className="py-3 font-medium text-right">Return %</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-white/10">

              {/* Example static data – later replace with investment state */}
              <tr>
                <td className="py-4">Mutual Fund</td>
                <td className="py-4 text-right font-semibold">₹ 50,000</td>
                <td className="py-4 text-right">12%</td>
              </tr>

              <tr>
                <td className="py-4">Stocks</td>
                <td className="py-4 text-right font-semibold">₹ 30,000</td>
                <td className="py-4 text-right">15%</td>
              </tr>

            </tbody>
          </table>

        </div>

        {/* Goal Progress Table */}
        <div className="bg-white dark:bg-[#111C33] 
                rounded-2xl shadow-md p-6">

          <h3 className="text-lg font-semibold mb-4">
            Goal Progress
          </h3>

          <table className="w-full text-sm">

            <thead className="text-left text-gray-500 border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="py-3 font-medium">Goal</th>
                <th className="py-3 font-medium text-right">Target</th>
                <th className="py-3 font-medium text-right">Saved</th>
                <th className="py-3 font-medium">Progress</th>
                <th className="py-3 font-medium text-right">Monthly Needed</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-white/10">

              {goalTable?.length === 0 ? (
                <tr>
                  <td className="py-4 text-gray-500">
                    No goals created
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              ) : (
                goalTable.map(goal => (
                  <tr key={goal.id}>

                    <td className="py-4 font-medium">
                      {goal.title}
                    </td>

                    <td className="py-4 text-right">
                      ₹ {goal.targetAmount.toLocaleString()}
                    </td>

                    <td className="py-4 text-right">
                      ₹ {goal.savedAmount.toLocaleString()}
                    </td>

                    <td className="py-4 w-48">
                      <div className="w-full bg-gray-200 dark:bg-[#0B1220] rounded-full h-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(goal.progress, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs mt-1 text-gray-500">
                        {goal.progress.toFixed(1)}%
                      </p>
                    </td>

                    <td className="py-4 text-right font-semibold">
                      ₹ {goal.monthlyRequired.toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })}
                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>

        </div>
      </div>


    </div>
  )
}

export default Dashboard_welcome
