import { api } from '@/axios'
import { useEffect, useRef, useState } from 'react'
import { FaBell, FaSearch } from 'react-icons/fa'

interface BarberiaBusqueda{
    id:string;
    name:string;
}


export const SearchSection = () => {

    const searchRef = useRef<HTMLDivElement>(null)
    const [barberias,setBarberias]=useState<BarberiaBusqueda[]>([])
    const [isLoading,setIsLoading]=useState<boolean>(true)

    const [results,setResults]=useState<BarberiaBusqueda[]>([])
    const callgetCompany=async()=>{
        try{
            const response=await api.get('/api/company')
            setBarberias(response.data)
            setIsLoading(false)
        }catch(error){
            setBarberias([])
            throw new Error ('ERROR: '+error)
           
        }
        
    }
    
    const getBarberShopBySearchTerm=(term:string)=>{
        if(term===''){
            setResults([])
        }else{
            const rpta=barberias.filter((barberia)=>barberia.name.toLowerCase().includes(term.toLowerCase()))
            setResults(rpta)    
        }
    }
    useEffect(()=>{
        callgetCompany()
    },[])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setResults([])
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])



    console.log(barberias)
    console.log(results)


    return (
        <section className="sm:hidden flex py-5 " ref={searchRef}>
              
            <form className="flex w-full relative border rounded-xl border-cyan-300 " >
                <input 
                    onChange={(e)=>{
                        getBarberShopBySearchTerm(e.target.value)
                    }}
                    type="search" placeholder="Buscar barbería..."
                    className=" px-5 rounded-l-xl bg-[#3A3644] w-full text-white focus:outline-none"
                />
                <button className="bg-[#3A3644] p-3 rounded-r-xl "><FaSearch size={20} className="text-white" /></button>
                <ul className={`absolute top-10 z-50 w-full rounded-b-xl bg-cyan-300 text-black max-h-32
                            overflow-y-scroll ${results?.length===0 && 'hidden'}`}>
                    {
                        isLoading ? (
                            <div>Loading BarberShops...</div>
                        ) :(
                            results?.map((barberia)=>{
                                return(
                                    <a className='w-full' href={`./new-reservation?barbershop=${barberia.id}`}>
                                        <li className='w-full py-2 pl-4'>
                                            {barberia.name}
                                        </li>
                                    </a>
                                )
                            })
                        )

                    
                    }
                </ul> 
            
            
            </form>

            <div className="bg-[#3A3644] ml-3 p-2 rounded-xl">
                <FaBell size={25} className="text-white"/>
            </div>

                   

        </section>
    )
}
