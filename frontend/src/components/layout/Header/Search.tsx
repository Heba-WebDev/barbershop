import { FaSearch } from 'react-icons/fa'


export const Search = () => {
    return (
        <form className="flex">
            <input type="search" placeholder="Buscar barbería..."
                className=" px-2 rounded-l bg-gray-100 focus:outline-none text-black"
            />
            <button className="bg-light-cayn p-2 rounded-r "><FaSearch /></button>
        </form>
    
    )
}
