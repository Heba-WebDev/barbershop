import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export const ServiceHoursNav = () => {
    const url = useLocation()
    return (
        <nav className='py-4 flex gap-4 justify-center'>
            <Link to='/services' className={`text-center w-full py-2 rounded-lg
            ${url.pathname === '/services' ? 'bg-light-cayn text-black' : 'bg-secondary-purple'}
            `}>
          Servicios
            </Link>
            <Link to='/hours' className={`text-center w-full py-2 rounded-lg
            ${url.pathname === '/hours' ? 'bg-light-cayn text-black' : 'bg-secondary-purple'}
            `}>
          Horarios
            </Link>
        </nav>
    )
}