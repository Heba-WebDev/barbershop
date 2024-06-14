import { FaCheck, FaPlusCircle } from 'react-icons/fa'

import { api } from '@/axios'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Company, userState } from '@/state/user'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const getCompanies = async (token: string): Promise<Company[]> => {
    try {
        const { data } = await api.get<Company[]>('/api/company', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (error) {
        throw new Error('Cannot get companies')
    }
}


export const NewReservationDialog = () => {

    const token = userState(state => state.token)
    const setCompanies = userState(state => state.setCompany)
    const companies = userState(state => state.company)

    const [companySelected, setCompanySelected] = useState<string>()

    useEffect(() => {
        if (token) {
            getCompanies(token)
                .then(data => setCompanies(data))
        }
    }, [])
	
    return (

        <Dialog>
            <DialogTrigger asChild>
                <div className="flex justify-center mt-5 text-purple-200">
                    <button>
                        <FaPlusCircle size={50} />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[420px] rounded-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center ">Selecciona una Barberia:</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center">
                        <Command className=" overflow-hidden h-44">
                            <CommandInput placeholder="Busqueda..." />
                            <CommandList>
                                <CommandEmpty>No hay coincidencias...</CommandEmpty>
                                <CommandGroup>
                                    {
                                        companies?.map(({ name, id }) => {
                                            return (
                                                <CommandItem key={id}>
                                                    <button onClick={() => {setCompanySelected(id)}}
                                                        className="flex items-center justify-between w-full">
                                                        <span>{name}</span>
                                                        <FaCheck className={`${id !== companySelected && 'hidden'} text-purple-900`} />

                                                    </button>
                                                </CommandItem>
                                            )
                                        })
                                    }
                                </CommandGroup>


                            </CommandList>
                        </Command>
                    </div>
                </div>

                <DialogFooter>
                    <Button className={`${!companySelected && 'pointer-events-none shadow opacity-60  '}`}>
                        <Link
                            to={`/new-reservation?barberShopId=${companySelected}`} className="w-full">¡Elegir!
                        </Link></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    )
}

