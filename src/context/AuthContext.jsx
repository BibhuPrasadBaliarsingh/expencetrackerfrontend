import React, { createContext, useEffect, useRef, useState } from 'react'
import { addExpense, addGoal, checkLogin, deleteExpense, deleteGoal, fetchExpenses, fetchGoals, updateExpense, updateGoals, userLogin, userLogout, userRegister, userUpdate } from '../apis';
import Features from '../components/pages/Features';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [goals, setGoals] = useState([])
  const [investments, setInvestments] = useState([])
  const [doEditExpense, setDoEditExpense] = useState(null)
  const [doEditGoal, setDoEditGoal] = useState(null)
  const [isLogin, setIsLogin] = useState(true) // For login or signup form show

  const sectionRefs = {
    about: useRef(null),
    features: useRef(null),
    reviews: useRef(null),
    contact: useRef(null)
  };

  const scrollToSection = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Register handle
  const register = ({ name, email, password }) => {
    const isRegistered = userRegister({ name, email, password })

    if (isRegistered) {
      return { success: true, message: "User registered successfully 🎉" }
    } else {
      return { success: false, message: "Email already exists" }
    }
  }

  // Login Handle
  const login = ({ email, password }) => {
    const response = userLogin({ email, password })

    if (response.success) {
      setUser(response.user)
      localStorage.setItem("currentUser", JSON.stringify(response.user))
      return {
        success: true,
        message: "Login successful"
      }
    }

    return {
      success: false,
      message: response.message
    }
  }

  // Logout
  const logout = () => {
    setUser(null)
    userLogout()
  }

  // Update Profile
  const update = (profileData) => {
    const response = userUpdate(profileData)
    if (response) {
      return { success: true, message: "Profile updated successfully" }
    } else {
      return { success: false, message: "Failed to update" }
    }
  }


  // Expense
  // Add new expense fucntion
  const addNewExpense = (expenseData) => {
    const response = addExpense(expenseData)
    // console.log(response)
    if (response.success) {
      fetchAllExpenses()
      // return { success: true }
    }

    return response
  }


  // Fetch all expenses
  const fetchAllExpenses = () => {
    const data = fetchExpenses()
    setExpenses(data)
  }


  // Delete expense
  const removeExpense = (id) => {
    const response = deleteExpense(id)

    if (response.success) {
      fetchAllExpenses()
    }

    return response
  }


  // Edit expenses
  const editExpense = (expenseData) => {
    const response = updateExpense(expenseData)

    if (response.success) {
      const updatedExpenses = fetchExpenses()
      setExpenses(updatedExpenses)
    }

    return response
  }



  // Goals
  // Add new goal fucntion
  const setGoal = (goalsData) => {
    const response = addGoal(goalsData)
    // console.log(response)
    if (response.success) {
      getGoals()
      // return { success: true }
    }

    return response
  }


  // Fetch all goals
  const getGoals = () => {
    const data = fetchGoals()
    setGoals(data)
  }


  // Delete goal
  const removeGoal = (id) => {
    const response = deleteGoal(id)

    if (response.success) {
      getGoals()
    }

    return response
  }


  // Edit goals
  const editGoal = (goalData) => {
    const response = updateGoals(goalData)

    if (response.success) {
      const updatedGoals = getGoals()
      setGoals(updatedGoals)
    }

    return response
  }


  // useEffect for stay logged in still after refresh
  useEffect(() => {
    const storedUser = checkLogin()
    // console.log("Stored user:", storedToken)

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  // useEffect for refreshing fetchAllExpenses
  useEffect(() => {
    if (user) {
      fetchAllExpenses()
      getGoals()
    }
  }, [user])

  // console.log(user)
  return (
    <AuthContext.Provider value={{
      user, register, login, logout, update, addNewExpense, removeExpense, expenses, editExpense, doEditExpense, setDoEditExpense, isLogin, setIsLogin, loading, setGoal, getGoals, removeGoal, editGoal, goals, doEditGoal, setDoEditGoal, sectionRefs,
      scrollToSection, investments, setInvestments
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
