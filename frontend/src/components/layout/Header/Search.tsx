import { api } from '@/axios'
import { userState } from '@/state/user'
import { FaSearch } from 'react-icons/fa'





export const Search = () => {

    const token=userState((store)=>store.token);

    const callgetCompany=async()=>{
        try{
            const response=await api.get("/api/company",{
                headers:{
                    Authorization:token,
                }
            })
            return response.data;
        }catch(error){
            
        }
        
    }


    const barberias=callgetCompany();
    console.log(barberias)
    console.log(token)
    return (
        <form className="flex">
            <input type="search" placeholder="Buscar barbería..."
                className=" px-2 rounded-l bg-gray-100 focus:outline-none text-black"
            />
            <button className="bg-light-cayn p-2 rounded-r "><FaSearch /></button>
        </form>
    
    )
}
