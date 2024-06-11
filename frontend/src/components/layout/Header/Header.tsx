
import { FaCalendarCheck, FaHome, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { Search } from '@/components/layout'
import { Link } from 'react-router-dom'
import { userState } from '@/state/user'

const navItems=[
    {
        name:'Home',
        icon:<FaHome />,
        path: '/'
    },
    {
        name:'Mis reservaciones',
        icon: <FaCalendarCheck />,
        path: '/reservations'
    },
    {
        name:'Mi perfil',
        icon:<FaUserCircle />,
        path: '/profile'
    },
]

const navItemsLoggedout = [
    {
        name:'Home',
        icon:<FaHome />,
        path: '/'
    },
    {
        name:'Ingresa',
        icon:<FaSignOutAlt />,
        path: '/register'
    },
]

export const Header = () => {
    const isLoggedin = userState((state) => state.is_loggedin)
    return (
        <header className="mb-6 hidden sm:flex justify-between bg-secondary-purple border-opacity-65 border-b-2 border-cyan-900 items-center
                        ">
            <div className="py-3 pl-5 pr-10 rounded-r-full">
                <Link to='/' className=' text-4xl logo font-bold'>BarberHub</Link>
            </div>

            <Search />

            <nav className="flex items-center">
                <ul className="flex pr-5 lg:pr-0">
                    {!isLoggedin && navItemsLoggedout.map((navItem)=>{
                        return <li className="text-light-cayn text-md mx-1 sm:mx-2 lg:mx-7  "
                            key={navItem.name}><a className="flex items-center text-2xl md:text-base" 
                                href={navItem.path}>{navItem.icon}  &nbsp; <span className=" hidden md:block">{navItem.name}</span></a></li> 
                    })}
                    {isLoggedin && navItems.map((navItem)=>{
                        return <li className="text-light-cayn text-md mx-1 sm:mx-2 lg:mx-7  "
                            key={navItem.name}><a className="flex items-center text-2xl md:text-base" 
                                href={navItem.path}>{navItem.icon}  &nbsp; <span className=" hidden md:block">{navItem.name}</span></a></li> 
                    })}
                </ul>
            </nav>
        </header>
    )
}
