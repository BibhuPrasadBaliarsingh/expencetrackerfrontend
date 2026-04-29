import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './components/routing/Routing'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={2000} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
