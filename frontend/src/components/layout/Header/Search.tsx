import { api } from '@/axios'
import { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

interface BarberiaBusqueda{
    id:string;
    name:string;
}



export const Search = () => {

    //const token=userState((store)=>store.token);
    const searchRef = useRef<HTMLDivElement>(null);
    const [barberias,setBarberias]=useState<BarberiaBusqueda[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(true);

    const [results,setResults]=useState<BarberiaBusqueda[]>([]);
    const callgetCompany=async()=>{
        try{
            const response=await api.get("/api/company")
            setBarberias(response.data);
            setIsLoading(false);
        }catch(error){
            setBarberias([]);
            throw new Error ('ERROR: '+error)
           
        }
        
    }
    
    const getBarberShopBySearchTerm=(term:string)=>{
        if(term===''){
            setResults([]);
        }else{
            const rpta=barberias.filter((barberia)=>barberia.name.toLowerCase().includes(term.toLowerCase()));
            setResults(rpta);    
        }
    }
    useEffect(()=>{
        callgetCompany();
    },[]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setResults([]);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);



    // console.log(barberias);
    // console.log(results)
    return (
        <div className='relative' ref={searchRef}>
            <form className="flex">
                <input type="search" placeholder="Buscar barbería..."
                    
                    onChange={(e)=>{
                        
                        getBarberShopBySearchTerm(e.target.value)
                    }}

                    className=" px-2 rounded-l bg-gray-100 focus:outline-none text-black"
                />
                <button className="bg-light-cayn p-2 rounded-r pointer-events-none"><FaSearch /></button>
            </form>
            <ul className={`absolute z-50 w-full rounded-b-xl bg-gray-800 border border-cyan-300 max-h-32
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
            
            

        </div>
        
    
    )
}
