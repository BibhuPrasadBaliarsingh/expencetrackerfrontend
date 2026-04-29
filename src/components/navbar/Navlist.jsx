import React from 'react'
import ListIterator from '../utils/ListIterator'
// import { useTheme } from "../../hooks/useTheme"

const Navlist = () => {
    const nav_items = ["features" ,"about", "reviews", "contact"]
    // const { theme, toggleTheme } = useTheme();

    return (
        <div className="h-full flex ml-auto">
            <ul className="w-[75%] gap-5 h-full flex items-center justify-evenly text-xl font-semibold capitalize text-blue-700 dark:text-blue-400">
                <ListIterator list={nav_items} />
                {/* <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:opacity-80 transition"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? "🌙" : "☀️"}
                </button> */}
            </ul>
        </div>
    )
}

export default Navlist
