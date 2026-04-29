const UserVal = "users"
const UserToken = "currentUser"

// Backend base URL (Render)
// Use this when switching from localStorage "fake APIs" to real API calls.
export const API_BASE_URL = "https://expencetrackerbackend-932m.onrender.com";

export const userRegister = ({ name, email, password }) => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []

    const isExist = users.find(item => item.email === email)
    if (isExist) return false

    users.push({ name, email, password, expenses: [] })
    localStorage.setItem(UserVal, JSON.stringify(users))

    return true
}


export const userLogin = ({ email, password }) => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = users.find(item => item.email === email)

    if (!currentUser) {
        return { success: false, message: "User not registered" }
    }

    if (currentUser.password !== password) {
        return { success: false, message: "Incorrect password" }
    }

    localStorage.setItem(UserToken, JSON.stringify(currentUser))
    return { success: true, user: currentUser }
}


export const checkLogin = () => {
    return localStorage.getItem(UserToken)
}


export const userLogout = () => {
    return localStorage.removeItem(UserToken)
}


export const userUpdate = (profileData) => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = JSON.parse(localStorage.getItem(UserToken))

    if (!currentUser) {
        return { success: false, message: "User not logged in" }
    }

    const userIndex = users.findIndex(
        user => user.email === currentUser.email
    )

    if (userIndex === -1) {
        return { success: false, message: "User not found" }
    }

    users[userIndex] = {
        ...users[userIndex],
        ...profileData
    };

    // update users array
    localStorage.setItem(UserVal, JSON.stringify(users));

    // update currentUser
    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    return { success: true, data: users[userIndex] };
}


export const addExpense = (expense) => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = JSON.parse(localStorage.getItem(UserToken))

    if (!currentUser) {
        return { success: false, message: "Not logged in" }
    }

    const userIndex = users.findIndex(
        user => user.email === currentUser.email
    )

    if (userIndex === -1) {
        return { success: false, message: "User not found" }
    }

    const newExpense = {
        id: Date.now(),
        ...expense
    }

    if (!users[userIndex].expenses) {
        users[userIndex].expenses = []
    }
    users[userIndex].expenses.push(newExpense)

    localStorage.setItem(UserVal, JSON.stringify(users))
    return { success: true }
}

export const fetchExpenses = () => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = JSON.parse(localStorage.getItem(UserToken))

    if (!currentUser) return []

    const user = users.find(item => item.email === currentUser.email)
    return user?.expenses || []
}

export const deleteExpense = (id) => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = JSON.parse(localStorage.getItem(UserToken))

    if (!currentUser) {
        return { success: false, message: "Not logged in" }
    }

    const userIndex = users.findIndex(
        user => user.email === currentUser.email
    )

    if (userIndex === -1) {
        return { success: false, message: "User not found" }
    }

    users[userIndex].expenses =
        users[userIndex].expenses.filter(item => item.id !== id)

    localStorage.setItem(UserVal, JSON.stringify(users))

    return { success: true }
}

export const updateExpense = (updatedExpense) => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = JSON.parse(localStorage.getItem(UserToken))

    if (!currentUser) {
        return { success: false, message: "User not logged in" }
    }

    const userIndex = users.findIndex(
        (user) => user.email === currentUser.email
    )

    if (userIndex === -1) {
        return { success: false, message: "User not found" }
    }

    users[userIndex].expenses =
        users[userIndex].expenses.map((expense) =>
            expense.id === updatedExpense.id
                ? updatedExpense
                : expense
        )

    localStorage.setItem(UserVal, JSON.stringify(users))

    return { success: true }
}





// Goals

export const addGoal = (goal) => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = JSON.parse(localStorage.getItem(UserToken))

    if (!currentUser) {
        return { success: false, message: "Not logged in" }
    }

    const userIndex = users.findIndex(
        user => user.email === currentUser.email
    )

    if (userIndex === -1) {
        return { success: false, message: "User not found" }
    }

    const newGoal = {
        id: Date.now(),
        ...goal
    }

    if (!users[userIndex].goals) {
        users[userIndex].goals = []
    }
    users[userIndex].goals.push(newGoal)

    localStorage.setItem(UserVal, JSON.stringify(users))
    return { success: true, message: "Goal created successfully" }
}

export const fetchGoals = () => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = JSON.parse(localStorage.getItem(UserToken))

    if (!currentUser) return []

    const user = users.find(item => item.email === currentUser.email)
    return user?.goals || []
}

export const deleteGoal = (id) => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = JSON.parse(localStorage.getItem(UserToken))

    if (!currentUser) {
        return { success: false, message: "Not logged in" }
    }

    const userIndex = users.findIndex(
        user => user.email === currentUser.email
    )

    if (userIndex === -1) {
        return { success: false, message: "User not found" }
    }

    users[userIndex].goals =
        users[userIndex].goals.filter(item => item.id !== id)

    localStorage.setItem(UserVal, JSON.stringify(users))

    return { success: true, message: "Goal deleted" }
}

export const updateGoals = (updatedGoals) => {
    let users = JSON.parse(localStorage.getItem(UserVal)) || []
    const currentUser = JSON.parse(localStorage.getItem(UserToken))

    if (!currentUser) {
        return { success: false, message: "User not logged in" }
    }

    const userIndex = users.findIndex(
        (user) => user.email === currentUser.email
    )

    if (userIndex === -1) {
        return { success: false, message: "User not found" }
    }

    users[userIndex].goals =
        users[userIndex].goals.map((goal) =>
            goal.id === updatedGoals.id
                ? updatedGoals
                : goal
        )

    localStorage.setItem(UserVal, JSON.stringify(users))

    return { success: true, message: "Goal updated" }
}



// this is a fake api which will get the users data from the localstorage. Then verifies using isExist if the email is there in the local storage it will return false or else it will return true
