import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../context/AuthContext'

const Goals = () => {
  const initialState = {
    id: "",
    title: "",
    targetAmount: "",
    category: "",
    lastdate: "",
    description: ""
  }

  const { setGoal, doEditGoal, setDoEditGoals, editGoal } = useContext(AuthContext)
  const [goalsData, setGoalsData] = useState(initialState)
  const { title, targetAmount, category, lastdate, description } = goalsData

  const calculateMonths = (targetDate) => {
    const today = new Date();
    const end = new Date(targetDate);

    if (end <= today) return 0;

    const yearDiff = end.getFullYear() - today.getFullYear();
    const monthDiff = end.getMonth() - today.getMonth();

    return yearDiff * 12 + monthDiff;
  };

  const handleChange = (e) => {
    const { name, value } = e.target

    setGoalsData(prev => ({ ...prev, [name]: value }))
  }

  const handleGoalsData = (e) => {
    e.preventDefault();

    const months = calculateMonths(lastdate);

    if (months <= 0) {
      toast.error("Please select a future date");
      return;
    }

    const target = Number(targetAmount);
    const monthlyRequired = target / months;

    const newGoal = {
      ...goalsData,
      id: crypto.randomUUID(),
      targetAmount: target,
      savedAmount: 0,
      createdAt: new Date().toISOString(),
      tenureMonths: months,
      monthlyRequired
    };

    // console.log(newGoal)
    let response;

    if (doEditGoal) {
      response = editGoal(newGoal)
    } else {
      response = setGoal(newGoal)
    }

    if (response.success) {
      toast.success(response.message);
      setGoalsData(initialState);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (doEditGoal) {
      setGoalsData(doEditGoal)
    }
  }, [doEditGoal])

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-10 py-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 dark:text-white">
          Goals
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Manage your name, password and account details.
        </p>
      </div>

      <form onSubmit={handleGoalsData} className="space-y-10">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Title
            </label>
            <input
              name="title"
              value={title}
              onChange={handleChange}
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700
                        focus:ring-2 focus:ring-teal-500 
                        focus:outline-none transition"
            />
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Target Amount
            </label>
            <input
              name="targetAmount"
              value={targetAmount}
              onChange={handleChange}
              type="number"
              required
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700
                        focus:ring-2 focus:ring-teal-500 
                        focus:outline-none transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Category
            </label>
            <select
              name="category"
              value={category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700"
            >
              <option value="" disabled>Select category</option>
              <option>Travel</option>
              <option>Purchase</option>
              <option>Shopping</option>
              <option>Home</option>
              <option>Investment</option>
              <option>Education</option>
              <option>Personal</option>
            </select>
          </div>

          {/* Last Date */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Last Date
            </label>
            <input
              name="lastdate"
              value={lastdate}
              onChange={handleChange}
              type="date"
              required
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700
                        focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">

          {doEditGoal && (
            <button
              type="button"
              onClick={() => {
                setGoalsData(initialState)
                setDoEditGoals(null)
              }}
              className="px-6 py-3 rounded-xl 
                        border border-gray-400 dark:border-gray-600
                        hover:bg-gray-200 dark:hover:bg-gray-800
                        transition"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-semibold text-white
                      bg-teal-600 hover:bg-teal-500
                      transition duration-300 hover:scale-105 shadow-md"
          >
            {doEditGoal ? "Update Goals" : "Add Goal"}
          </button>

        </div>

      </form>
    </div>
  )
}

export default Goals
