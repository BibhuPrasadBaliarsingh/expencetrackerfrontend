import React, { createContext, useEffect, useRef, useState } from 'react'
import {
  addExpense,
  addGoal,
  checkLogin,
  deleteExpense,
  deleteGoal,
  fetchExpenses,
  fetchGoals,
  updateExpense,
  updateGoals,
  userLogin,
  userLogout,
  userRegister,
  userUpdate,
} from '../apis'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expenses, setExpenses] = useState([])
  const [goals, setGoals] = useState([])
  const [investments, setInvestments] = useState([])
  const [doEditExpense, setDoEditExpense] = useState(null)
  const [doEditGoal, setDoEditGoal] = useState(null)
  const [isLogin, setIsLogin] = useState(true)

  const sectionRefs = {
    about: useRef(null),
    features: useRef(null),
    reviews: useRef(null),
    contact: useRef(null),
  }

  const scrollToSection = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  // Register (real backend)
  const register = async ({ name, email, password }) => {
    const response = await userRegister({ name, email, password })
    if (response.success) return { success: true, message: 'User registered successfully' }
    return { success: false, message: response.message || 'Registration failed' }
  }

  // Login (real backend)
  const login = async ({ email, password }) => {
    const response = await userLogin({ email, password })
    if (response.success) {
      setUser(response.user)
      return { success: true, message: 'Login successful' }
    }
    return { success: false, message: response.message }
  }

  // Logout
  const logout = () => {
    setUser(null)
    userLogout()
  }

  // Update Profile (still local for now)
  const update = (profileData) => {
    const response = userUpdate(profileData)
    if (response?.success) return { success: true, message: 'Profile updated successfully' }
    return { success: false, message: response?.message || 'Failed to update' }
  }

  // Expenses (real backend)
  const fetchAllExpenses = async () => {
    const data = await fetchExpenses()
    setExpenses(data)
  }

  const addNewExpense = async (expenseData) => {
    const response = await addExpense(expenseData)
    if (response.success) await fetchAllExpenses()
    return response
  }

  const removeExpense = async (id) => {
    const response = await deleteExpense(id)
    if (response.success) await fetchAllExpenses()
    return response
  }

  const editExpense = async (expenseData) => {
    const response = await updateExpense(expenseData)
    if (response.success) await fetchAllExpenses()
    return response
  }

  // Goals (local)
  const setGoal = (goalsData) => {
    const response = addGoal(goalsData)
    if (response.success) getGoals()
    return response
  }

  const getGoals = () => {
    const data = fetchGoals()
    setGoals(data)
  }

  const removeGoal = (id) => {
    const response = deleteGoal(id)
    if (response.success) getGoals()
    return response
  }

  const editGoal = (goalData) => {
    const response = updateGoals(goalData)
    if (response.success) {
      getGoals()
    }
    return response
  }

  useEffect(() => {
    const auth = checkLogin()
    if (auth?.user) setUser(auth.user)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      fetchAllExpenses()
      getGoals()
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        update,
        addNewExpense,
        removeExpense,
        expenses,
        editExpense,
        doEditExpense,
        setDoEditExpense,
        isLogin,
        setIsLogin,
        loading,
        setGoal,
        getGoals,
        removeGoal,
        editGoal,
        goals,
        doEditGoal,
        setDoEditGoal,
        sectionRefs,
        scrollToSection,
        investments,
        setInvestments,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
