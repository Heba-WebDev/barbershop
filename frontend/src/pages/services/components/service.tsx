import { service } from '../types'
import { Switch } from '@/components/ui/switch'

export const Service = ({name, price}: service) => {
    return (
        <div className='flex items-center justify-between'>
            <div>
                <p className='md:text-xl'>{name}</p>
                <p className=' text-sm text-slate-400'>${price}</p>
            </div>
            <div>
                <Switch className='data-[state]:checked:bg-red-600' />
            </div>
        </div>
    )
}