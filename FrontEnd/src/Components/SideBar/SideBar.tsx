import { Link } from 'react-router-dom'
import { BsFillMortarboardFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaBoxes } from 'react-icons/fa';

interface Props {}

const SideBar = ({}: Props) => {
  return (
    <nav className="block py-4 px-6 top-0  w-64 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
        <button className="md:hidden flex items-center justify-center  ">
        <i className="fas fa-ellipsis-v"></i>
        </button>
        <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden ">
            <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
                <div className="md:flex-col md:min-w-full flex flex-col list-none divide-y-2 divide-red-600 ">
                    <Link to="abilities" className='flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-2 pt-2 no-underline '>
                        <BsFillMortarboardFill />
                        <h6 className='ml-3 '>Abilities</h6>
                    </Link>
                    <Link to="base-stats" className='flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-2 pt-2 no-underline'>
                        <FiUsers />
                        <h6 className='ml-3'>Sprites</h6>
                    </Link>
                    <Link to="held-items" className='flex md:min-w-full text-blueGray-500 text-medium uppercase font-bold block pt--1 pb-2 pt-2 no-underline'>
                        <FaBoxes />
                        <h6 className='ml-3'>Held Items</h6>
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default SideBar  