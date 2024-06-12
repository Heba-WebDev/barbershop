import { useEffect } from 'react'
import { userState } from '@/state/user'
import { Link, useNavigate } from 'react-router-dom'
import { ProfileAvatar } from '@/lib/profileAvatar'
import { FaSignOutAlt, FaBusinessTime } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { ProfileForm } from './components/Form'

export const ProfileView = () => {
    const token = userState((store) => store.token)
    const user = userState((state) => state.user)
    const logout = userState((state) => state.logout)

    const navigate = useNavigate()
    const handleLogOut = () => {
        logout()
        toast.success('La sesión ha sido cerrada')
        navigate('/')
    }
    useEffect(() => {
        if(!token) {
            navigate('/')
        }
    }, [navigate, token])
    return (
        <section className='py-4 h-screen flex flex-col gap-2'>
            <div className='rounded-lg bg-secondary-purple w-[95%] mx-auto flex gap-1 flex-col py-4 '>
                {user && <ProfileAvatar name={user?.name as string} />}
                <p className='text-center text-lg mt-1'>{user?.name}</p>
                <p className='text-center text-sm opacity-25 -mt-1'>{user?.email}</p>
                <ProfileForm />
            </div>
            <div className='mt-[3%] pl-[2%]'>
                {!user?.is_verified && user?.role[0] === 'CLIENT' && <>
                    <div className='p-1 rounded-lg flex w-42 items-center'>
                        <span className=' bg-secondary-purple w-10 flex justify-center py-1 rounded-lg items-center'><FaBusinessTime className='opacity-50'/></span>
                        <Button onClick={() => toast.success('Revisa el correo que te ha llegado para verificar tu cuenta')} className=' bg-transparent hover:bg-transparent'><span className='underline'>Ser propietario</span></Button>
                    </div>
                </>}
                {user?.is_verified && user?.role[0] === 'CLIENT' && <>
                    <div className='p-1 rounded-lg flex w-42 items-center'>
                        <span className=' bg-secondary-purple w-10 flex justify-center py-1 rounded-lg items-center'><FaBusinessTime className='opacity-50'/></span>
                        <Button className=' bg-transparent hover:bg-transparent'><Link to='/company' className='underline'>Ser propietario</Link></Button>
                    </div>
                </>}
                {user?.role[0] !== 'CLIENT' && <>
                    <div className='p-1 rounded-lg flex w-42 items-center'>
                        <span className=' bg-secondary-purple w-10 flex justify-center py-1 rounded-lg items-center'><FaBusinessTime className='opacity-50'/></span>
                        <Button className=' bg-transparent hover:bg-transparent'><Link to='/services' className='underline'>Servicios</Link></Button>
                    </div>
                </>}
                <div className='p-1 rounded-lg flex w-42 items-center'>
                    <span className=' bg-secondary-purple w-10 flex justify-center py-1 rounded-lg items-center'><FaSignOutAlt className='opacity-50'/></span>
                    <Button onClick={handleLogOut} className=' bg-transparent hover:bg-transparent'>Cerrar sesión</Button>
                </div>
            </div>
        </section>
    )
}