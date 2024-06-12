import { useState } from 'react'
import { Formik, Form } from 'formik'
import { FaEnvelope, FaUser, FaPhone, FaEdit, FaCheck } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { updateProfileValidationSchema } from '../schema'
import { IValues } from '../types'
import { userState } from '@/state/user'
import { toast } from 'react-toastify'
import { updateNameApi, updatePhoneNumberApi } from '../api'

export const ProfileForm = () => {
    const [edit, setEdit] = useState({
        name: false,
        email: false,
        phoneNumber: false,
    })
    const user = userState((state) => state.user)
    const setUSer = userState((state) => state.setUser)
    const token = userState((state) => state.token)
    const initialValues: IValues = {
        name: user?.name as string,
        email: user?.email as string,
        phoneNumber: user?.phone_number as string
    }

    const handleNameChange = async(values: IValues) => {
        try {
            await updateNameApi(values.name, user?.id as string, token as string)
            setUSer({
                id: user?.id as string,
                name:values.name,
                email: user?.email as string,
                phone_number: user?.phone_number as string,
                is_active: user?.is_active as boolean,
                is_verified: user?.is_verified as boolean,
                avatar: user?.avatar as string,
                role: user?.role as string[],
                company: user?.company
            })
            toast.success('El nombre ha sido cambiado exitosamente')
            setEdit({ ...edit, name: false })
        }catch(error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }
    const handlePhoneNumberChange = async(values: IValues) => {
        try {
            await updatePhoneNumberApi(values.phoneNumber, user?.id as string, token as string)
            setUSer({
                id: user?.id as string,
                name: user?.name as string,
                email: user?.email as string,
                phone_number: values.phoneNumber as string,
                is_active: user?.is_active as boolean,
                is_verified: user?.is_verified as boolean,
                avatar: user?.avatar as string,
                role: user?.role as string[],
                company: user?.company
            })
            toast.success('El número de teléfono ha sido cambiado exitosamente')
            setEdit({ ...edit, phoneNumber: false })
        }catch(error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }
    const handleSubmit = () => {}
    return (
        <section className="w-full items-center max-w-md mx-auto px-4">
            <Formik
                initialValues={initialValues}
                validationSchema={updateProfileValidationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form className="flex flex-col gap-6 mt-12 pb-12">
                        <div className="flex flex-col">
                            <label htmlFor="name"></label>
                            <div className="relative flex items-center gap-4">
                                <div className=' w-full'>
                                    <FaUser className="absolute bottom-3 left-4 opacity-20" />
                                    <input
                                        disabled={!edit.name}
                                        name="name"
                                        type="text"
                                        placeholder="Nombre"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        className={`pl-10 w-full ${edit['name'] ? '' : 'text-dark-gray '} bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none`}
                                    />
                                </div>
                                {!edit['name'] ? <>
                                    <button onClick={() => {
                                        setEdit({ ...edit, name: true })
                                    }}><FaEdit className=' text-xl opacity-50'/></button>
                                </>
                                    :
                                    <>
                                        <button type='submit' onClick={() => handleNameChange(formik.values)}><FaCheck className='text-green-400 opacity-50'/></button>
                                        <button onClick={() => {
                                            setEdit({ ...edit, name: false })
                                        }}><MdDelete className='text-red-600 opacity-50'/></button>
                                    </>
                                }
                            </div>
                        </div>
                        {formik.errors.name && formik.touched.name ? (
                            <span className="text-red-600 text-sm pt-1">
                                {formik.errors.name}
                            </span>
                        ) : (
                            ''
                        )}
                        <div className="flex flex-col">
                            <label htmlFor="email"></label>
                            <div className="relative flex gap-4 items-center">
                                <div className=' w-full relative'>
                                    <FaEnvelope className=" absolute bottom-3 left-4 opacity-20" />
                                    <input
                                        disabled={true}
                                        name="email"
                                        type="email"
                                        placeholder="registro@ejemplo.com"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        className="pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none"
                                    />
                                </div>
                                <button onClick={() => toast.error('No se puede cambiar el correo')}><FaEdit className=' text-xl opacity-50'/></button>
                            </div>
                        </div>
                        {formik.errors.email && formik.touched.email ? (
                            <span className="text-red-600 text-sm pt-1">
                                {formik.errors.email}
                            </span>
                        ) : (
                            ''
                        )}
                        <div>
                            <label htmlFor="phoneNumber"></label>
                            <div className=" relative">
                                <div className="flex gap-4 items-center">
                                    <div className='w-full relative'>
                                        <FaPhone className="absolute bottom-3 left-4 opacity-20" />
                                        <input
                                            disabled={!edit['phoneNumber']}
                                            name="phoneNumber"
                                            type="text"
                                            placeholder="Escribe tu numbero de telefono"
                                            onChange={formik.handleChange}
                                            value={formik.values.phoneNumber}
                                            className={`pl-10 w-full ${edit['phoneNumber'] ? '' : 'text-dark-gray '} bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none`}
                                        />
                                    </div>
                                    {!edit['phoneNumber'] ? <>
                                        <button onClick={() => {
                                            setEdit({ ...edit, phoneNumber: true })
                                        }}><FaEdit className=' text-xl opacity-50'/></button>
                                    </>
                                        :
                                        <>
                                            <button type='submit' onClick={() => handlePhoneNumberChange(formik.values)}><FaCheck className='text-green-400 opacity-50'/></button>
                                            <button onClick={() => {
                                                setEdit({ ...edit, phoneNumber: false })
                                            }}><MdDelete className='text-red-600 opacity-50'/></button>
                                        </>
                                    }
                                </div>
                                {formik.touched.phoneNumber && (
                                    <p className="text-red-600  text-sm pt-1">
                                        {formik.errors.phoneNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}