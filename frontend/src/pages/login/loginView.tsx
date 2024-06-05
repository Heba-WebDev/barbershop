import { useEffect } from 'react'
import { Formik, Form } from 'formik'
import { loginValidationSchema } from './schema'
import { Button } from '@/components/ui/button'
import { FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa'
import { ILogin } from './types'
import { loginApi } from './api'
import { toast } from 'react-toastify'
import { userStore } from '@/state/user'
import { useNavigate } from 'react-router-dom'


export const LoginView = () => {
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        password: ''
    }
    const setToken = userStore((state) => state.setToken)
    const setUser = userStore((state) => state.setUser)
    const token = userStore((store) => store.token)
    const handleSubmit = async (values: ILogin) => {
        try {
            const res = await loginApi(values)
            setUser(res.user)
            setToken(res.token)
            toast.success('Iniciado sesión exitosamente')
        } catch (error: unknown) {
            if(error instanceof Error) toast.error(error.message)
        }
    }
    useEffect(() => {
        if(token) {
            navigate('/')
        }
    }, [navigate, token])
    return (
        <section className=" grid items-center max-w-md mx-auto  h-screen px-4">
            <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form
                        onSubmit={formik.handleSubmit}
                        className=" flex flex-col gap-3"
                    >
                        <FaUserCircle  className=' text-purple-500 text-9xl rounded-full mx-auto p-1 mb-6 bg-gray-800'/>
                        <div className=" flex flex-col">
                            <label htmlFor="email"></label>
                            <div className=' relative'>
                                <FaEnvelope className=' absolute bottom-3 left-4 opacity-20'/>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Correo"
                                    {...formik.getFieldProps('email')}
                                    className="pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none"
                                />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <span className=" text-red-600 text-sm pt-1">
                                    {formik.errors.email}
                                </span>
                            ) : null}
                        </div>
                        <div className=" flex flex-col">
                            <label htmlFor="password"></label>
                            <div className='w-full relative'>
                                <FaLock className=' absolute bottom-3 left-4 opacity-20'/>
                                <input
                                    id="password"
                                    type="text"
                                    placeholder="Contraseña"
                                    {...formik.getFieldProps('password')}
                                    className="pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none"
                                />
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <span className=" text-red-600 text-sm pt-1">
                                    {formik.errors.password}
                                </span>
                            ) : null}
                        </div>
                        <Button
                            type='submit'
                            className=' mt-[30%] bg-light-cayn rounded-full max-w-36 mx-auto w-full text-black hover:bg-[#68CBD9]'
                        >
                Entrar
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    )
}
