import { FaBoxesPacking, FaCirclePlus, FaScissors } from 'react-icons/fa6'
import { MdInvertColors } from 'react-icons/md'
import { PiHairDryerFill } from 'react-icons/pi'

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
type Role='admin' | 'client';

const user:Role='admin'

export const ProductsBar = () => {
    return (
        <>
            <section className="flex justify-around mt-10">
                {
                    products.map((product)=>{
                        return(
                            <div>
                                <a href="#">
                                    <div className="bg-[#3A3644] text-5xl p-5 rounded-xl">
                                        <span className="flex justify-center text-purple-100">{product.icon}</span>
                                    </div>
                                    <h2 className="text-indigo-200 text-center text-lg mt-2">{product.name}</h2>
                                </a>
                            </div>
                        )
                    })
                }
            
            </section>
            {
                user==='admin' && (
                    <div className="flex justify-center mt-5">
                        <button className="text-pink-200 border p-2 rounded-xl border-purple-200
                                            flex items-center">
                            <FaCirclePlus className="inline mr-2"/>Agregar otro servicio</button>  
                    </div>
                
                )
            }
        </>
    
    )
}
