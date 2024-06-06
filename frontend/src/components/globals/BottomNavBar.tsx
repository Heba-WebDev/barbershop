import { FaHome, FaUserCircle } from "react-icons/fa"
import { FaCalendarCheck } from "react-icons/fa6"
import { useLocation } from "react-router-dom"


const navItems=[
    {
        name:"Home",
        icon:<FaHome />,
        path:"/home"
    },
    {
        name:"Mis reservaciones",
        icon: <FaCalendarCheck />,
        path:"/services",
    },
    {
        name:"Mi perfil",
        icon:<FaUserCircle />,
        path:"/profile",

    }
]


export const BottomNavBar = () => {

    const currentRoute=useLocation();

  return (
        <div className="sm:hidden justify-around py-3 px-5 border-t border-purple-200 flex 
                             fixed bottom-0 bg-gray-900 w-full">
                    {
                        navItems.map((item)=>{
                            return (
                               
                                <div key={item.name} className=" w-3/12">
                                    <a href="#">
                                        <div className={`flex items-center py-2 px-4 justify-center
                                                        ${currentRoute.pathname===item.path &&
                                                        "rounded-full bg-gradient-to-r from-purple-400 to-indigo-600"}
                                                `}>
                                            <span className="inline text-2xl">{item.icon}</span>
                                            <span className={`ml-2 ${currentRoute.pathname===item.path ? "block" : "hidden"}`}>
                                                {item.name}</span>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }                 
        </div>
  )
}
