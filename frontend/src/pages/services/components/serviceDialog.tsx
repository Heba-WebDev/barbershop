import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Formik, Form } from 'formik'
import { addServiceValidationSchema } from '../schema'
import { FaUser } from 'react-icons/fa'
import { IAddService, Services } from '../types'
import { userState } from '@/state/user'
import { toast } from 'react-toastify'
import { createServiceApi, fetchServicsApi } from '../api'

export function ServiceDialog() {
    const serviceList = userState((state) => state.service)
    const setService = userState((state) => state.setService)
    const [open, setOpen] = useState(false)
    const initialValues = {
        name: '',
        price: 0,
    }
    const token = userState((state) => state.token)
    const handleSubmit = async(values: IAddService) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const num = parseFloat(values.price)
            await createServiceApi({name: values.name, price: num }, token as string)
            const res = await fetchServicsApi(token as string)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const newList = (_prevServceList: Services[]) =>
              [...res] as Services[]
            setService(newList(serviceList as Services[]))
            toast.success(`${values.name} ha sido registrado como servicio`)
            setOpen(false)
        } catch (error: unknown) {
            if(error instanceof Error) toast.error(error.message)
        }
    }
    return (
        <div>
            
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className='w-full h-12 bg-secondary-purple text-light-cayn mt-2 text-xl
        hover:bg-[#68CBD9] hover:text-[#2C293A]'
                    >
              +
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[90%] bg-secondary-purple border-transparent rounded-sm sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Agregar Servicio</DialogTitle>
                        <DialogDescription>
                Agregue un servicio para ofrecerlo a los clientes
                        </DialogDescription>
                    </DialogHeader>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={addServiceValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <Form className='flex flex-col gap-3'>
                                <div className='flex flex-col'>
                                    <label htmlFor='name'></label>
                                    <div className='relative'>
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
                                    <span className='text-red-600 text-sm -mt-1'>
                                        {formik.errors.name}
                                    </span>
                                ) : (
                                    ''
                                )}

                                <div className='flex flex-col'>
                                    <label htmlFor='price'></label>
                                    
                                    <div className='relative'>
                                        <FaUser className='absolute bottom-3 left-4 opacity-20' />
                                        <input
                                            name='price'
                                            type='text'
                                            placeholder='Precio'
                                            onChange={formik.handleChange}
                                            value={formik.values.price}
                                            className='pl-10 w-full text-dark-gray bg-transparent border border-gray-500
                                 rounded-full py-[2px] h-10 focus:outline-none'
                                        />
                                    </div>
                                </div>
                                {formik.errors.price && formik.touched.price ? (
                                    <span className='text-red-600 text-sm -mt-1'>
                                        {formik.errors.price}
                                    </span>
                                ) : (
                                    ''
                                )}

                                <Button
                                    type='submit'
                                    className='bg-light-cayn rounded-full mx-auto w-full mt-2 text-black hover:bg-[#68CBD9]'
                                >
                                    Guardar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <DialogFooter>
                        
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
