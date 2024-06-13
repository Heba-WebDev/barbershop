/* eslint-disable semi */
import { service } from '../types'
import { Switch } from '@/components/ui/switch'
import { toast } from 'react-toastify'
import {
    desactivateServiceApi,
    fetchServicsApi,
    deletedServiceApi,
} from '../api';
import { userState } from '@/state/user'
import { TrashIcon } from '@/assets/trashIcon'

export const Service = ({id, name, price, is_active}: service) => {
    const token = userState((state) => state.token)
    const setServices = userState((state) => state.setService)
    const handleSwitch = async() => {
        try {
            await desactivateServiceApi(id, token as string)
            const res = await fetchServicsApi(token as string)
            setServices(res)
            toast.success(`El servicio ${name} ha sido ${is_active ? 'desactivado' : 'activado'}`)
        }catch(error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    const handleDelete = async () => {
        try {
            await deletedServiceApi(id, token as string);
            const res = await fetchServicsApi(token as string);
            setServices(res);
            toast.success(
                `El servicio ${name} ha sido ${
                    is_active ? 'eliminado' : 'activado'
                }`
            );
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
        }
    };

    return (
        <div className='flex items-center justify-between'>
            <div>
                <p className='md:text-xl'>{name}</p>
                <p className=' text-sm text-slate-400'>${price}</p>
            </div>
            <div className='flex items-center gap-2'>
                <Switch onClick={handleSwitch} checked={is_active} className='data-[state]:checked:bg-red-600' />
                <div className=' hover:cursor-pointer'><TrashIcon onClick={handleDelete}/></div>
            </div>
        </div>
    )
}