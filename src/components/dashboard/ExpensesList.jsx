import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

const ExpensesList = () => {
    const { expenses, removeExpense, setDoEditExpense } = useContext(AuthContext)
    const navigate = useNavigate()

    const total = expenses.reduce((acc, curr) => {
        return acc + Number(curr.amount)
    }, 0)

    const handleUpdate = (item) => {
        setDoEditExpense(item)
        navigate("/dashboard/expense form")
    }

    return (
        <div className="flex flex-col h-full">

            <h2 className="text-2xl font-semibold mb-6">
                All Expenses
            </h2>

            {expenses.length === 0 ? (
                <div className="flex items-center justify-center h-40
        bg-white dark:bg-[#111C33]
        rounded-xl shadow-md">
                    <p className="text-gray-500 dark:text-gray-400">
                        No expenses added yet.
                    </p>
                </div>
            ) : (
                <>
                    {/* Scrollable Expense List */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-1">

                        {expenses.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-[#111C33]
                p-4 rounded-xl shadow-md
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-4 transition hover:shadow-lg"
                            >
                                {/* Left */}
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {item.category}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {item.date}
                                    </p>
                                </div>

                                {/* Right */}
                                <div className="text-left sm:text-right">
                                    <p className="text-lg font-bold text-teal-600">
                                        ₹{item.amount}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.payment_type}
                                    </p>

                                    <button
                                        onClick={() => removeExpense(item.id)}
                                        className="mt-2 text-sm px-3 py-1 rounded-lg
                    bg-red-500/10 text-red-500
                    hover:bg-red-500 hover:text-white
                    transition"
                                    >
                                        <MdDelete />
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(item)}
                                        className="mt-2 text-sm px-3 py-1 rounded-lg
                    bg-blue-500/10 text-blue-500
                    hover:bg-blue-500 hover:text-white
                    transition"
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Section */}
                    <div
                        className="sticky bottom-0 left-0 w-full
            bg-teal-600 text-white
            p-5 rounded-2xl
            shadow-2xl z-5
            flex justify-between items-center"
                    >
                        <p className="text-lg font-semibold">
                            Total Spending
                        </p>

                        <p className="text-2xl font-bold">
                            ₹{total}
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}

export default ExpensesList
