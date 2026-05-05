import React, { useContext, useMemo } from 'react'
import { FaArrowUp, FaBell, FaBolt, FaBullseye, FaShieldAlt, FaLightbulb } from 'react-icons/fa'
import AuthContext from '../../context/AuthContext'

const Insights = () => {
  const { user, expenses, goals, investments } = useContext(AuthContext)

  const income = Number(user?.income ?? 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
  const savings = Math.max(income - totalExpenses, 0)
  const savingsRatio = income > 0 ? savings / income : 0
  const spendingRatio = income > 0 ? totalExpenses / income : 0

  const riskProfile = income <= 0
    ? { label: 'No Income', color: 'text-slate-400', badge: 'bg-slate-500/10', suggestion: 'Add income to analyze your risk profile and investment options.' }
    : savingsRatio < 0.1
      ? { label: 'High Risk', color: 'text-red-500', badge: 'bg-red-500/10', suggestion: 'Focus on FD or RD until you build a stronger buffer.' }
      : savingsRatio <= 0.3
        ? { label: 'Moderate', color: 'text-amber-500', badge: 'bg-amber-500/10', suggestion: 'Explore Mutual Funds or SIP for balanced growth.' }
        : { label: 'Stable', color: 'text-emerald-500', badge: 'bg-emerald-500/10', suggestion: 'Stocks or crypto can help accelerate growth with your healthy savings buffer.' }

  const expenseByCategory = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const category = expense.category || 'Other'
      const amount = Number(expense.amount || 0)
      acc[category] = (acc[category] || 0) + amount
      return acc
    }, {})
  }, [expenses])

  const categoryEntries = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1])

  const categoryColors = [
    '#14b8a6', '#2563eb', '#818cf8', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#f97316'
  ]

  const pieStyle = useMemo(() => {
    if (!totalExpenses || categoryEntries.length === 0) return null
    let start = 0
    const segments = categoryEntries.map(([_, amount], index) => {
      const percentage = (amount / totalExpenses) * 100
      const end = start + percentage
      const color = categoryColors[index % categoryColors.length]
      const segment = `${color} ${start.toFixed(2)}% ${end.toFixed(2)}%`
      start = end
      return segment
    })
    return { backgroundImage: `conic-gradient(${segments.join(', ')})` }
  }, [categoryEntries, totalExpenses])

  const formattedCurrency = (value) => Number(value || 0).toLocaleString('en-IN')

  const targetSavings = income * 0.2
  const savingsGap = Math.max(targetSavings - savings, 0)

  const goalWarnings = goals
    .map((goal) => {
      const today = new Date()
      const endDate = new Date(goal.lastdate)
      const monthsLeft = Math.max(
        (endDate.getFullYear() - today.getFullYear()) * 12 +
        (endDate.getMonth() - today.getMonth()),
        1
      )
      const remaining = Math.max(Number(goal.targetAmount || 0) - Number(goal.savedAmount || 0), 0)
      return {
        ...goal,
        monthlyRequired: remaining > 0 ? remaining / monthsLeft : 0,
      }
    })
    .filter((goal) => goal.monthlyRequired > 0)
    .sort((a, b) => b.monthlyRequired - a.monthlyRequired)

  const insights = []
  if (!income) {
    insights.push({
      icon: <FaBell className="text-teal-500" />,
      title: 'Add your income',
      message: 'Enter monthly income in your profile to unlock tailored advice and risk insights.',
      tone: 'bg-slate-100 dark:bg-white/5'
    })
  } else {
    if (spendingRatio >= 0.85) {
      insights.push({
        icon: <FaBolt className="text-red-500" />,
        title: 'Overspending alert',
        message: `You are spending ${Math.round(spendingRatio * 100)}% of your income. Trim discretionary costs to stay on track.`,
        tone: 'bg-red-100/60 dark:bg-red-500/10'
      })
    } else if (spendingRatio >= 0.65) {
      insights.push({
        icon: <FaBell className="text-amber-500" />,
        title: 'Spending is rising',
        message: `You are spending ${Math.round(spendingRatio * 100)}% of your income. Keep a close watch on non-essential purchases.`,
        tone: 'bg-amber-100/60 dark:bg-amber-500/10'
      })
    } else {
      insights.push({
        icon: <FaLightbulb className="text-emerald-500" />,
        title: 'Good spending habits',
        message: `You are spending ${Math.round(spendingRatio * 100)}% of your income. Your budget is in a healthy range.`,
        tone: 'bg-emerald-100/60 dark:bg-emerald-500/10'
      })
    }

    if (savingsGap > 0) {
      insights.push({
        icon: <FaLightbulb className="text-slate-900" />,
        title: 'Save more this month',
        message: `You can save ₹${formattedCurrency(savingsGap)} more this month by optimizing one or two expense categories.`,
        tone: 'bg-slate-100 dark:bg-white/5'
      })
    }

    if (savings > 0) {
      insights.push({
        icon: <FaArrowUp className="text-slate-900" />,
        title: 'Invest unused savings',
        message: `Consider investing ₹${formattedCurrency(savings)} from your current surplus to build long-term wealth.`,
        tone: 'bg-slate-100 dark:bg-white/5'
      })
    } else {
      insights.push({
        icon: <FaShieldAlt className="text-slate-900" />,
        title: 'Build your buffer',
        message: 'You have little or no savings right now. Start with small deposits into emergency savings.',
        tone: 'bg-slate-100 dark:bg-white/5'
      })
    }
  }

  goalWarnings.slice(0, 2).forEach((goal) => {
    insights.push({
      icon: <FaBullseye className="text-teal-500" />,
      title: `${goal.title} needs attention`,
      message: `Your "${goal.title}" needs ₹${formattedCurrency(goal.monthlyRequired)}/month — adjust the plan.`,
      tone: 'bg-slate-100 dark:bg-white/5'
    })
  })

  if (insights.length === 0) {
    insights.push({
      icon: <FaLightbulb className="text-teal-500" />,
      title: 'Ready to grow',
      message: 'Your financial snapshot looks good. Keep tracking expenses and invest smartly.',
      tone: 'bg-slate-100 dark:bg-white/5'
    })
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-white/95 dark:bg-[#0B1220]/90 border border-slate-200 dark:border-white/10 shadow-2xl p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-500 mb-3">Insights Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Your smart financial advisor</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">
              Actionable money advice based on income, expenses, goals, and investments. See alerts, spending analytics, and the investment profile that fits your current cash flow.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111C33] p-6 shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">Risk profile</p>
            <p className={`mt-3 text-2xl font-semibold ${riskProfile.color}`}>{riskProfile.label}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Savings ratio: {(savingsRatio * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 shadow-xl p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Suggestions & notifications</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Action items generated from your latest financial data.</p>
            </div>
            <FaBell className="text-3xl text-teal-500" />
          </div>
          <div className="grid gap-4">
            {insights.map((item, index) => (
              <div key={`${item.title}-${index}`} className={`${item.tone} rounded-3xl border border-slate-200 dark:border-white/10 p-5`}>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-white/10 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Risk profile & advice</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Investment guidance based on current savings buffer.</p>
            </div>
            <div className={`rounded-3xl px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white ${riskProfile.badge}`}> {riskProfile.label} </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 dark:bg-[#0B1220] p-5 border border-slate-200 dark:border-white/10">
              <p className="text-sm text-slate-500 dark:text-slate-400">Current buffer</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">₹{formattedCurrency(savings)}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{income > 0 ? `${Math.round(savingsRatio * 100)}% of income` : 'Waiting for income data'}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 dark:bg-[#0B1220] p-5 border border-slate-200 dark:border-white/10">
              <p className="text-sm text-slate-500 dark:text-slate-400">Recommended investment types</p>
              <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {riskProfile.label === 'High Risk' && 'FD, RD'}
                {riskProfile.label === 'Moderate' && 'Mutual Funds, SIP'}
                {riskProfile.label === 'Stable' && 'Stocks, Crypto'}
                {riskProfile.label === 'No Income' && 'Add income first'}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">{riskProfile.suggestion}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 dark:bg-[#0B1220] p-5 border border-slate-200 dark:border-white/10">
              <p className="text-sm text-slate-500 dark:text-slate-400">Investments tracked</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{investments.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 shadow-xl p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Expense analytics</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">See where your money is going and which categories are driving spend.</p>
          </div>
          <div className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1220] px-4 py-2 text-sm text-slate-600 dark:text-slate-300">
            Total spent: ₹{formattedCurrency(totalExpenses)}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div className="mx-auto flex h-72 w-72 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 shadow-inner" style={pieStyle ?? {}}>
            {!pieStyle && (
              <div className="text-center text-slate-500 dark:text-slate-400">
                <p className="font-semibold">No data yet</p>
                <p className="text-sm">Add some expenses to see your chart.</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {categoryEntries.length === 0 ? (
              <div className="rounded-3xl bg-slate-50 dark:bg-[#0B1220] p-6 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                Add expenses with categories like Food, Travel, Grocery, and Bills to populate this chart.
              </div>
            ) : (
              categoryEntries.map(([category, amount], index) => {
                const percentage = totalExpenses ? ((amount / totalExpenses) * 100).toFixed(0) : '0'
                const color = categoryColors[index % categoryColors.length]
                return (
                  <div key={category} className="rounded-3xl bg-slate-50 dark:bg-[#0B1220] p-4 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                        <p className="font-semibold text-slate-900 dark:text-white">{category}</p>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{percentage}%</p>
                    </div>
                    <div className="h-3 rounded-full bg-slate-200 dark:bg-[#0B1220] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }} />
                    </div>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">₹{formattedCurrency(amount)}</p>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Insights
