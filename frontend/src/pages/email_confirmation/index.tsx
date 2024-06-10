import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userState } from '@/state/user'
import { useNavigate } from 'react-router-dom'
import { confirmEmailApi } from './api'
import { toast } from 'react-toastify'

export const EmailConfirmationView = () => {
    const [verifyToken, setVerifyToken] = useState<boolean | null>(null)
    const user = userState((state) => state.user)
    const navigate = useNavigate()
    const params = useParams()
    const token = params.token?.split('=')[1]
    if (user?.is_verified == 'true') navigate('/')
    if (!token) navigate('/')
    useEffect(() => {
        const verify = async () => {
            try {
                await confirmEmailApi(token as string)
                setVerifyToken(true)
                toast.success('Tu correo ha sideo verificado')
                navigate('/')
            } catch (error) {
                setVerifyToken(false)
                navigate('/')
            }
        }
        verify()
    }, [token, navigate, user?.is_verified])

    return (
        <section className='flex flex-col justify-center h-screen gap-4 py-8'>
            {user?.is_verified === 'false' && verifyToken === false && <h2 className=' font-bold text-2xl text-center'>No hemos podido verificar tu correo</h2>}

            {user?.is_verified === 'false' &&
            verifyToken === null && <h2 className=' font-bold text-2xl text-center'>Estamos verificadando tu correo ...</h2>}

            {verifyToken &&
            <h2 className=' font-bold text-2xl text-center'>Tu correo ha sideo verificado!</h2>}
            <img src='/email-confirmed.svg' className='
             max-w-60 md:max-w-96 mx-auto' />
        </section>
    )
}