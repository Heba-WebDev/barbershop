import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { userState } from '@/state/user'
import { useNavigate } from 'react-router-dom'
import { confirmEmailApi } from './api'
import { toast } from 'react-toastify'

export const EmailConfirmationView = () => {
    const [verifyToken, setVerifyToken] = useState<boolean | null>(false)
    const is_loggedin = userState((state) => state.is_loggedin)
    const user = userState((state) => state.user)
    const setUser = userState((state) => state.setUser)
    const navigate = useNavigate()
    const params = useParams()
    const token = params.token?.split('=')[1]
    if (!token) navigate('/')
    useEffect(() => {
        const verify = async () => {
            try {
                if (user?.is_verified === true) navigate('/')
                await confirmEmailApi(token as string)
                setVerifyToken(true)
                if(is_loggedin) {
                    setUser({
                        id: user?.id as string,
                        name: user?.name as string,
                        email: user?.email as string,
                        phone_number: user?.phone_number as string,
                        is_active: user?.is_active as boolean,
                        is_verified: true,
                        avatar: user?.avatar as string,
                        role: user?.role as string[],
                        company: user?.company,
                    })
                    toast.success('Tu correo ha sideo verificado!')
                }
            } catch (error) {
                setVerifyToken(false)
                navigate('/')
            }
        }
        verify()
    }, [token, navigate, user?.is_verified])

    return (
        <section className='flex flex-col justify-center h-screen gap-4 py-8'>
            {user?.is_verified === false && verifyToken === false && <h2 className=' font-bold text-2xl text-center'>No hemos podido verificar tu correo</h2>}

            {user?.is_verified === false &&
            verifyToken === null && <h2 className=' font-bold text-2xl text-center'>Estamos verificadando tu correo ...</h2>}

            {verifyToken &&
            <h2 className=' font-bold text-2xl text-center'>Tu correo ha sideo verificado!</h2>}
            <img src='/email-confirmed.svg' className='
             max-w-60 md:max-w-96 mx-auto' />
            <Link
                to='/'
                className='bg-light-cayn p-3 rounded-full text-center font-semibold underline mx-auto w-fit mt-4 text-black hover:bg-[#68CBD9]'
            >
                <span className=' px-4'>Volver a la página principal</span>
            </Link>
        </section>
    )
}