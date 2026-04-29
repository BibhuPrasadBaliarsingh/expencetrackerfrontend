import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Welcome from "../pages/Welcome";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ExpenseForm from "../expense/ExpenseForm";
import Dashboard from "../dashboard/Dashboard";
import Dashboard_welcome from "../dashboard/Dashboard_welcome";
import Login from "../login/Login";
import Features from "../pages/Features";
import Reviews from "../pages/Reviews";
import ProtectedRoute from "./ProtectedRoute";
import Goals from "../dashboard/Goals";
import Insights from "../dashboard/Insights";
import Overview from "../dashboard/Overview";
import Profile from "../dashboard/Profile";
import Invest from "../investment/Invest";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Welcome />
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/features",
                element: <Features />,
            },
            {
                path: "/reviews",
                element: <Reviews />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />  
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "/dashboard",
                        element: <Dashboard_welcome />
                    },
                    {
                        path: "/dashboard/expense form",
                        element: <ExpenseForm />
                    },
                    {
                        path: "/dashboard/goals",
                        element: <Goals />
                    },
                    {
                        path: "/dashboard/invest",
                        element: <Invest />
                    },
                    {
                        path: "/dashboard/insights",
                        element: <Insights />
                    },
                    {
                        path: "/dashboard/profile",
                        element: <Profile />
                    },
                    {
                        path: "/dashboard/Overview",
                        element: <Overview />
                    },
                ]
            },
            {
                path:"/login",
                element: <Login />
            }
        ]
    }
])