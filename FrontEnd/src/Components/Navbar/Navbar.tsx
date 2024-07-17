import { Link } from "react-router-dom"
import logo from "./Pokeball.jpg"
import { useAuth } from "../../Context/useAuth"


interface Props
{

}

function Navbar({}: Props) 
{
    const { isLoggedIn, user,  logOut} = useAuth()
    
    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <img src={logo} alt="" className="size-20"/>
                    </Link>
                    <div className="hidden font-bold lg:flex">
                        <Link to="/search" className="text-black hover:text-darkBlue">
                            Search
                        </Link>
                    </div>                    
                    <div className="hidden font-bold lg:flex">
                        <Link to="/leader-board" className="text-black hover:text-darkBlue">
                            Leaderboard
                        </Link>
                    </div>
                </div>
                {isLoggedIn() ? (
                <div className="hidden lg:flex items-center space-x-6 text-back">
                    <div className="hover:text-darkBlue">Welcome {user?.userName}</div>
                        <a
                            onClick={logOut}
                            className="px-8 py-3 font-bold rounded text-white bg-red-600 hover:opacity-70"
                            >
                            LogOut
                        </a>
                    </div>
                ):(
                <div className="hidden lg:flex items-center space-x-6 text-back">
                    <Link to="/login" className="hover:text-darkBlue">Login</Link>
                        <Link
                            to="/register"
                            className="px-8 py-3 font-bold rounded text-white bg-red-600 hover:opacity-70"
                            >
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar