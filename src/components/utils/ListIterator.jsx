import { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const ListIterator = ({ list }) => {
  const {scrollToSection} = useContext(AuthContext)
  return (
    <>
      {
        list.map((ele, index) => {
          return <li 
          key={index + 1} 
          onClick={() => scrollToSection(ele)}
          className="cursor-pointer hover:text-teal-400 
          relative px-3 py-2
          after:absolute after:left-0 after:bottom-0
          after:h-[2px] after:w-full after:bg-teal-400
          after:scale-x-0 after:origin-right
          after:transition-transform after:duration-300 after:ease-out
          hover:after:scale-x-100 hover:after:origin-left"
          >
            {ele}
          </li>
        })
      }
    </>
  )
}

export default ListIterator