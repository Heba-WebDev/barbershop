import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { companyValidationSceham } from '../schema'
import { IRegisterCompany } from '../types'
import { userState } from '@/state/user'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaPhone, FaUserCircle, FaTrash, FaBuilding } from 'react-icons/fa'

export const CompanyForm = () => {
    const token = userState((state) => state.token)
    const navigate = useNavigate()
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
    useEffect(() => {
        if (!token) navigate('/')
    }, [token, navigate])
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
            const file = event.currentTarget.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedAvatar(reader.result as string | null)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleSubmit = async(values: IRegisterCompany) => {
        console.log(values)
    }
    const initialValues = {
        name: '',
        phoneNumber: '',
        address: '',
        avatar: null
    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={companyValidationSceham}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
            >
                {(formik) => (
                    <Form className="grid gap-3 pt-10">
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="name" className=" text-sm">
                                {formik.touched.name && formik.errors.name ? (
                                    <p className=" text-red-600">{formik.errors.name}</p>
                                ) : (
                                    'Nombre'
                                )}
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className='pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none'
                            />
                            <FaUser className='absolute bottom-3 left-4 opacity-20' />
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="phoneNumber" className=" text-sm">
                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                    <p className=" text-red-600">{formik.errors.phoneNumber}</p>
                                ) : (
                                    'Telefono'
                                )}
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                className='pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none'
                            />
                            <FaPhone className='absolute bottom-3 left-4 opacity-20' />
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="address" className=" text-sm">
                                {formik.touched.address && formik.errors.address ? (
                                    <p className=" text-red-600">{formik.errors.address}</p>
                                ) : (
                                    'Dir'
                                )}
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                className='pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none'
                            />
                            <FaBuilding className='absolute bottom-3 left-4 opacity-20' />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 pt-6">
                            <label htmlFor="avatar" className="">
                  
                            </label>

                            <div className=" flex flex-col-reverse items-center ">
                                <input
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (event.currentTarget.files) {
                                            formik.setFieldValue(
                                                'profile_picture',
                                                event.currentTarget.files[0]
                                            )
                                        }
                                        handleAvatarChange(event)
                                    }}
                                    className="hidden bg-gray-100 w-full py-3 px-2 rounded-lg focus:outline-[#33A077]"
                                />
                                <div className=" flex items-center gap-4 justify-between">
                                    {selectedAvatar && (
                                        <img
                                            src={selectedAvatar}
                                            width={50}
                                            height={50}
                                            style={{ height: '60px', width: '60px' }}
                                            className="rounded-full object-cover"
                                        />
                                    )}
                                    {!selectedAvatar && (
                                        <>
                                            <FaUserCircle width={50}
                                                height={50}
                                                style={{ height: '60px', width: '60px' }}
                                                className=' text-gray-500 text-9xl object-cover rounded-full mx-auto p-1 bg-gray-800'/>
                                        </>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const inputElement =
                          document.getElementById('avatar')
                                            if (inputElement) {
                                                inputElement.click()
                                            }
                                        }}
                                        className="bg-light-cayn text-black py-1 px-4 rounded-full focus:outline-[#33A077]"
                                    >
                      Logo
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Remove avatar"
                                        onClick={() => setSelectedAvatar(null)}
                                    >
                                        <FaTrash className=' text-gray-500' />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className=" mt-[10%] bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full py-3 text-lg font-semibold mx-auto w-full hover:bg-[#68CBD9]"
                        >
                            Registra
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}