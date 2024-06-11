import { FaBoxesPacking, FaCirclePlus, FaScissors } from 'react-icons/fa6'
import { MdInvertColors } from 'react-icons/md'
import { PiHairDryerFill } from 'react-icons/pi'
import { userState } from '@/state/user'
import { Link } from 'react-router-dom'

const products=[
    {
        name:'Corte',
        icon: <FaScissors />,
    },
    {
        name:'Coloreo',
        icon: <MdInvertColors />,
    },
    {
        name:'¡Nuevo!',
        icon: <PiHairDryerFill />,
    },
    {
        name:'Packs',
        icon: <FaBoxesPacking />
    }
    
]

export const ProductsBar = () => {
    const isLoggedin = userState((state) => state.is_loggedin)
    const usr = userState((state) => state.user)
    return (
        <>
            <section className="flex justify-around mt-10 py-10">
                {
                    products.map((product)=>{
                        return(
                            <div>
                                <a href="/services">
                                    <div className=" bg-secondary-purple text-5xl p-5 rounded-xl">
                                        <span className="flex justify-center text-light-cayn">{product.icon}</span>
                                    </div>
                                    <h2 className=" text-gray-400 text-center text-lg mt-2">{product.name}</h2>
                                </a>
                            </div>
                        )
                    })
                }
            
            </section>
            {
                !isLoggedin && (
                    <div className="flex justify-center mt-5 pb-8">
                        <Link to='/services' className="text-light-cayn border p-2 rounded-xl border-gray-500
                                            flex items-center">
                            <FaCirclePlus className="inline mr-2"/>Buscar otro servicio</Link>  
                    </div>
                
                )
            }
            {
                isLoggedin && usr?.role[0] === 'CLIENT' && (
                    <div className="flex justify-center mt-5 pb-8">
                        <Link to='/services' className="text-light-cayn border p-2 rounded-xl border-gray-500
                                            flex items-center">
                            <FaCirclePlus className="inline mr-2"/>Buscar otro servicio</Link>  
                    </div>
                
                )
            }
            {
                isLoggedin && usr?.role[0] !== 'CLIENT' && (
                    <div className="flex justify-center mt-5 pb-8">
                        <Link to='/services' className="text-light-cayn border p-2 rounded-xl border-gray-500
                                            flex items-center">
                            <FaCirclePlus className="inline mr-2"/>Agregar un servicio</Link>  
                    </div>
                
                )
            }
        </>
    
    )
}
