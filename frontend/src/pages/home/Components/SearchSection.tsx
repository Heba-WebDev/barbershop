import { FaBell, FaSearch } from "react-icons/fa"


export const SearchSection = () => {
  return (
    <section className="sm:hidden flex py-5">
              
        <form className="flex w-full">
          <input type="search" placeholder="Buscar barbería..."
          className=" px-5 rounded-l-xl bg-[#3A3644] w-full text-white"
          />
          <button className="bg-[#3A3644] p-3 rounded-r-xl "><FaSearch size={20} className="text-white" /></button>
        </form>

        <div className="bg-[#3A3644] ml-3 p-2 rounded-xl">
        <FaBell size={25} className="text-white"/>
        </div>
        

        </section>
  )
}
