import { service } from '../types'
import { Switch } from '@/components/ui/switch'
import { toast } from 'react-toastify'
import { desactivateServiceApi } from '../api'
import { userState } from '@/state/user'

export const Service = ({id, name, price, is_active}: service) => {
    const token = userState((state) => state.token)
    const handleSwitch = async() => {
        try {
            await desactivateServiceApi(id, token as string)
            toast.success(`El servicio ${name} ha sido desactivado`)
        }catch(error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }
    return (
        <div className='flex items-center justify-between'>
            <div>
                <p className='md:text-xl'>{name}</p>
                <p className=' text-sm text-slate-400'>${price}</p>
            </div>
            <div>
                <Switch onClick={handleSwitch} checked={is_active} className='data-[state]:checked:bg-red-600' />
            </div>
        </div>
    )
}