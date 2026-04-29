export const API_BASE_URL = "https://expencetrackerbackend-932m.onrender.com";

// Local storage keys (keep these stable)
const AUTH_KEY = "auth"; // { token, user }

const safeJsonParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const getAuth = () => safeJsonParse(localStorage.getItem(AUTH_KEY));

export const setAuth = ({ token, user }) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ token, user }));
  // Backward-compat for existing code paths (if any)
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem("currentUser");
};

export const checkLogin = () => getAuth();

const apiFetch = async (path, { method = "GET", body, token } = {}) => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : null;
  const text = !isJson ? await res.text() : null;

  if (!res.ok) {
    const message =
      data?.message ||
      (text ? text.slice(0, 300) : null) ||
      `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data || text;
    throw error;
  }

  return data || text;
};

// ---------------------------
// Auth (real backend)
// ---------------------------

export const userRegister = async ({ name, email, password }) => {
  try {
    const data = await apiFetch("/api/auth/register", {
      method: "POST",
      body: { name, email, password },
    });

    // Do not auto-login on register (UX: keep current screen flow)
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const userLogin = async ({ email, password }) => {
  try {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });

    setAuth({ token: data.token, user: data.user });
    return { success: true, user: data.user, token: data.token };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const userLogout = () => {
  clearAuth();
};

// ---------------------------
// Users / Profile (real backend)
// ---------------------------

export const fetchMe = async () => {
  const auth = getAuth();
  if (!auth?.token) return null;

  try {
    const data = await apiFetch("/api/users/me", { token: auth.token });
    // backend shape: { user }
    if (data?.user) {
      setAuth({ token: auth.token, user: data.user });
      return data.user;
    }
    return null;
  } catch {
    return null;
  }
};

export const updateMe = async (profileData) => {
  const auth = getAuth();
  if (!auth?.token) return { success: false, message: "Not logged in" };

  try {
    const data = await apiFetch("/api/users/me", {
      method: "PUT",
      token: auth.token,
      body: profileData,
    });

    if (data?.user) {
      setAuth({ token: auth.token, user: data.user });
      return { success: true, data: data.user };
    }

    return { success: false, message: "Failed to update profile" };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// ---------------------------
// Transactions (real backend)
// Map existing "expense" UI to backend transactions.
// ---------------------------

const toDateInputValue = (dateLike) => {
  if (!dateLike) return "";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};

const normalizeExpense = (t) => ({
  id: t._id,
  _id: t._id,
  amount: t.amount,
  // UI currently expects `title`, `payment_type`, `description`.
  // Backend does not store these, so we map `title` to category.
  title: t.category,
  category: t.category,
  date: toDateInputValue(t.date),
  payment_type: "",
  description: "",
  type: t.type,
});

export const fetchExpenses = async () => {
  const auth = getAuth();
  if (!auth?.token) return [];

  try {
    const data = await apiFetch("/api/transactions", { token: auth.token });
    return (data || [])
      .filter((t) => t.type === "expense")
      .map(normalizeExpense);
  } catch {
    return [];
  }
};

export const addExpense = async (expense) => {
  const auth = getAuth();
  if (!auth?.token) return { success: false, message: "Not logged in" };

  try {
    const data = await apiFetch("/api/transactions", {
      method: "POST",
      token: auth.token,
      body: {
        amount: Number(expense.amount),
        type: "expense",
        category: expense.category || expense.title || "Miscellaneous",
        date: expense.date,
      },
    });

    return { success: true, data: normalizeExpense(data) };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const deleteExpense = async (id) => {
  const auth = getAuth();
  if (!auth?.token) return { success: false, message: "Not logged in" };

  try {
    await apiFetch(`/api/transactions/${id}`, {
      method: "DELETE",
      token: auth.token,
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const updateExpense = async (updatedExpense) => {
  const auth = getAuth();
  if (!auth?.token) return { success: false, message: "Not logged in" };

  const id = updatedExpense?.id || updatedExpense?._id;
  if (!id) return { success: false, message: "Missing expense id" };

  try {
    const data = await apiFetch(`/api/transactions/${id}`, {
      method: "PUT",
      token: auth.token,
      body: {
        amount: Number(updatedExpense.amount),
        type: "expense",
        category: updatedExpense.category || updatedExpense.title || "Miscellaneous",
        date: updatedExpense.date,
      },
    });

    return { success: true, data: normalizeExpense(data) };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// ---------------------------
// Investments (real backend)
// ---------------------------

const normalizeInvestment = (i) => ({
  id: i._id,
  _id: i._id,
  title: i.title,
  investmentType: i.investmentType,
  investedAmount: i.investedAmount,
  interestRate: i.interestRate,
  investmentDate: toDateInputValue(i.investmentDate),
  remarks: i.remarks || "",
});

export const fetchInvestments = async () => {
  const auth = getAuth();
  if (!auth?.token) return [];

  try {
    const data = await apiFetch("/api/investments", { token: auth.token });
    return (data || []).map(normalizeInvestment);
  } catch {
    return [];
  }
};

export const addInvestment = async (investment) => {
  const auth = getAuth();
  if (!auth?.token) return { success: false, message: "Not logged in" };

  try {
    const data = await apiFetch("/api/investments", {
      method: "POST",
      token: auth.token,
      body: {
        title: investment.title,
        investmentType: investment.investmentType,
        investedAmount: Number(investment.investedAmount),
        interestRate: Number(investment.interestRate),
        investmentDate: investment.investmentDate,
        remarks: investment.remarks || "",
      },
    });

    return { success: true, data: normalizeInvestment(data) };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const deleteInvestment = async (id) => {
  const auth = getAuth();
  if (!auth?.token) return { success: false, message: "Not logged in" };

  try {
    await apiFetch(`/api/investments/${id}`, {
      method: "DELETE",
      token: auth.token,
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// ---------------------------
// Goals / Profile (still local for now)
// Store per authenticated user id.
// ---------------------------

const goalsStorageKey = () => {
  const auth = getAuth();
  const userId = auth?.user?.id || auth?.user?._id;
  return userId ? `goals:${userId}` : 'goals:guest';
};

export const userUpdate = (profileData) => updateMe(profileData);

export const addGoal = (goal) => {
  const auth = getAuth();
  if (!auth?.user || !auth?.token) return { success: false, message: 'Not logged in' };

  const key = goalsStorageKey();
  const goals = safeJsonParse(localStorage.getItem(key)) || [];

  const newGoal = { id: Date.now(), ...goal };
  goals.push(newGoal);
  localStorage.setItem(key, JSON.stringify(goals));

  return { success: true, message: 'Goal created successfully' };
};

export const fetchGoals = () => {
  const auth = getAuth();
  if (!auth?.user || !auth?.token) return [];

  const key = goalsStorageKey();
  return safeJsonParse(localStorage.getItem(key)) || [];
};

export const deleteGoal = (id) => {
  const auth = getAuth();
  if (!auth?.user || !auth?.token) return { success: false, message: 'Not logged in' };

  const key = goalsStorageKey();
  const goals = (safeJsonParse(localStorage.getItem(key)) || []).filter((g) => g.id !== id);
  localStorage.setItem(key, JSON.stringify(goals));
  return { success: true, message: 'Goal deleted' };
};

export const updateGoals = (updatedGoal) => {
  const auth = getAuth();
  if (!auth?.user || !auth?.token) return { success: false, message: 'User not logged in' };

  const key = goalsStorageKey();
  const goals = (safeJsonParse(localStorage.getItem(key)) || []).map((g) =>
    g.id === updatedGoal.id ? updatedGoal : g
  );
  localStorage.setItem(key, JSON.stringify(goals));
  return { success: true, message: 'Goal updated' };
};
