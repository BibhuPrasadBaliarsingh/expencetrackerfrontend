import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-toastify'

const ExpenseForm = () => {

  const initialState = {
    title: "",
    amount: "",
    category: "",
    date: "",
    payment_type: "",
    description: ""
  }

  const [expenseData, setExpenseData] = useState(initialState)
  const { title, amount, category, date, payment_type, description } = expenseData

  const { addNewExpense, doEditExpense, setDoEditExpense, editExpense } = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target

    setExpenseData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const handleExpenseData = (e) => {
  e.preventDefault()
  let response

  if (doEditExpense) {
    response = editExpense(expenseData)
  } else {
    response = addNewExpense(expenseData)
  }

  if (response.success) {
    toast.success(doEditExpense ? "Expense updated" : "Expense added")
    setExpenseData(initialState)
    setDoEditExpense(null)
  } else {
    toast.error(response.message)
  }
}

  useEffect(() => {
    if (doEditExpense) {
      setExpenseData(doEditExpense)
    }
  }, [doEditExpense])


  // console.log(expenses)

  return (
  <div className="h-full overflow-y-auto px-4 sm:px-8 py-6">

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-semibold">
        {doEditExpense ? "Update Expense" : "Add New Expense"}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
        {doEditExpense
          ? "Modify your existing expense details"
          : "Track your spending by adding a new expense"}
      </p>
    </div>

    {/* Card Container */}
    <div className="bg-white dark:bg-[#111C33] 
                    rounded-2xl shadow-lg 
                    p-6 sm:p-10 
                    max-w-5xl mx-auto">

      <form onSubmit={handleExpenseData} className="space-y-6">

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

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Amount
            </label>
            <input
              name="amount"
              value={amount}
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
              <option>Fashion</option>
              <option>Food</option>
              <option>Grocery</option>
              <option>Travel</option>
              <option>Miscellaneous</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Date
            </label>
            <input
              name="date"
              value={date}
              onChange={handleChange}
              type="date"
              required
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700
                        focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Payment Type */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Payment Type
            </label>
            <select
              name="payment_type"
              value={payment_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700"
            >
              <option value="" disabled>Select payment method</option>
              <option>UPI</option>
              <option>Cash</option>
              <option>Credit card</option>
            </select>
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

          {doEditExpense && (
            <button
              type="button"
              onClick={() => {
                setExpenseData(initialState)
                setDoEditExpense(null)
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
            {doEditExpense ? "Update Expense" : "Add Expense"}
          </button>

        </div>

      </form>
    </div>
  </div>
)

}

export default ExpenseForm