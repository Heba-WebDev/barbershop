import { Formik, Form } from 'formik'
import { FaEnvelope, FaUser, FaPhone, FaEdit } from 'react-icons/fa'
import { updateProfileValidationSchema } from '../schema'
import { IValues } from '../types'
import { userState } from '@/state/user'

export const ProfileForm = () => {
    const user = userState((state) => state.user)
    const initialValues: IValues = {
        name: user?.name as string,
        email: user?.email as string,
        phoneNumber: user?.phone_number as string
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
                                        disabled={true}
                                        name="name"
                                        type="text"
                                        placeholder="Nombre"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        className="pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none"
                                    />
                                </div>
                                <button><FaEdit className=' text-xl opacity-50'/></button>
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
                                <button><FaEdit className=' text-xl opacity-50'/></button>
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
                                            disabled={true}
                                            name="phoneNumber"
                                            type="text"
                                            placeholder="Escribe tu numbero de telefono"
                                            onChange={formik.handleChange}
                                            value={formik.values.phoneNumber}
                                            className="pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none"
                                        />
                                    </div>
                                    <button><FaEdit className=' text-xl opacity-50'/></button>
                                </div>
                                {formik.touched.phoneNumber && (
                                    <p className="text-red-600  text-sm pt-1">
                                        {formik.errors.phoneNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex gap-4 justify-around mt-4'>
                            <button className=' bg-light-cayn font-semibold text-black py-1 text-opacity-85 rounded-xl w-full'>Guardar</button>
                            <button className='py-1 border border-gray-50 border-opacity-20 text-red-400 text-opacity-85 rounded-xl w-full'>Cancelar</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}