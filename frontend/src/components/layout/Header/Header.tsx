
import { FaCalendarCheck, FaHome, FaUserCircle } from "react-icons/fa";
import { Search } from "@/components/layout";

const navItems=[
    {
        name:"Home",
        icon:<FaHome />  
    },
    {
        name:"Mis reservaciones",
        icon: <FaCalendarCheck />
    },
    {
        name:"Mi perfil",
        icon:<FaUserCircle />
    }
]

export const Header = () => {
  return (
    <header className="hidden sm:flex justify-between bg-black border-b-2 border-pink-400 items-center
                        ">
        <div className="bg-white py-3 pl-5 pr-10 rounded-r-full">
            <img className="w-24"
            src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Twitch_logo_%28wordmark_only%29.svg" />
        </div>

        <Search />

        <nav className="flex items-center">
        
            <ul className="flex pr-5 lg:pr-0">

                {navItems.map((navItem)=>{
                    return <li className="text-purple-200 text-md mx-1 sm:mx-2 lg:mx-7  "
                     key={navItem.name}><a className="flex items-center text-2xl md:text-base" 
                     href="#">{navItem.icon}  &nbsp; <span className=" hidden md:block">{navItem.name}</span>
                     </a></li> 
                })}
            </ul>
        </nav>
    </header>
  )
}
