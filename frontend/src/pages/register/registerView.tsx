import { Formik, Form } from 'formik'
import { Button } from '@/components/ui/button'
import { FaEnvelope, FaLock, FaUserCircle, FaUser, FaPhone } from 'react-icons/fa'
import { registerApi } from './api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { registerValidationSchema } from './schema'
import { userState } from '@/state/user'
import { useEffect } from 'react'
import { IRegister, IValues } from './types'

export const RegisterView = () => {
    const navigate = useNavigate()
    const token = userState((store) => store.token)
    const initialValues: IValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    }
    const handleSubmit = async(values: IValues) => {
        try {
            const val: IRegister = {
                name: values.name,
                email: values.email,
                password: values.password,
                phoneNumber: values.phoneNumber
            }
            await registerApi(val)
            toast.success('El registro ha sido exitoso')
            navigate('/login')
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
        <main className='grid items-center max-w-md mx-auto  h-screen px-4'>
            <Formik
                initialValues={initialValues}
                validationSchema={registerValidationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form className='flex flex-col gap-3 -mt-12'>
                        <FaUserCircle  className=' text-purple-500 text-9xl rounded-full mx-auto p-1 mb-6 bg-gray-800'/>
                        <div className='flex flex-col'>
                            <label htmlFor='name'></label>
                            <div className=' relative'>
                                <FaUser className='absolute bottom-3 left-4 opacity-20' />
                                <input
                                    name='name'
                                    type='text'
                                    placeholder='Nombre'
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    className='pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none'
                                />
                            </div>
                        </div>
                        {formik.errors.name && formik.touched.name ? (
                            <span className='text-red-600 text-sm pt-1'>{formik.errors.name}</span>
                        ) : (
                            ''
                        )}
                        <div className='flex flex-col'>
                            <label htmlFor='email'></label>
                            <div className='relative'>
                                <FaEnvelope className=' absolute bottom-3 left-4 opacity-20'/>
                                <input
                                    name='email'
                                    type='email'
                                    placeholder='registro@ejemplo.com'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className='pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none'
                                />
                            </div>
                        </div>
                        {formik.errors.email && formik.touched.email ? (
                            <span className='text-red-600 text-sm pt-1'>{formik.errors.email}</span>
                        ) : (
                            ''
                        )}
                        <div>
                            <label htmlFor='password'></label>
                            <div className='relative'>
                                <FaLock className='absolute bottom-3 left-4 opacity-20'/>
                                <input
                                    name='password'
                                    type='password'
                                    placeholder='Escribe tu contraseña'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    className='pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none'
                                />
                            </div>
                            {formik.touched.password && (
                                <p className='text-red-600  text-sm pt-1'>{formik.errors.password}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor='confirmPassword'></label>
                            <div className=' relative'>
                                <div className=' relative'>
                                    <FaLock className='absolute bottom-3 left-4 opacity-20'/>
                                    <input
                                        name='confirmPassword'
                                        type='password'
                                        placeholder='Confirma tu contraseña'
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword}
                                        className='pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none'
                                    />
                                </div>
                                {formik.touched.confirmPassword && (
                                    <p className='text-red-600  text-sm pt-1'>{formik.errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor='phoneNumber'></label>
                            <div className=' relative'>
                                <div className=' relative'>
                                    <FaPhone className='absolute bottom-3 left-4 opacity-20'/>
                                    <input
                                        name='phoneNumber'
                                        type='text'
                                        placeholder='Escribe tu numbero de telefono'
                                        onChange={formik.handleChange}
                                        value={formik.values.phoneNumber}
                                        className='pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none'
                                    />
                                </div>
                                {formik.touched.phoneNumber && (
                                    <p className='text-red-600  text-sm pt-1'>{formik.errors.phoneNumber}</p>
                                )}
                            </div>
                        </div>
                        <Button type='submit' className=' mt-[4%] bg-light-cayn rounded-full max-w-36 mx-auto w-full text-black hover:bg-[#68CBD9]'>Registrarme</Button>
                        <div className=' flex gap-1 text-center mx-auto text-sm'>
                            <span>Ya tienes una cuenta?</span>
                            <a href='/login' className=' text-light-cayn font-bold underline'>Entrar</a>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    )
}
