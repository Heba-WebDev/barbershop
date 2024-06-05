import { FaSearch } from 'react-icons/fa'


export const Search = () => {
    return (
        <form className="flex">
            <input type="search" placeholder="Buscar barbería..."
                className=" px-2 rounded-l bg-purple-100"
            />
            <button className="bg-purple-300 p-2 rounded-r "><FaSearch /></button>
        </form>
    
    )
}
