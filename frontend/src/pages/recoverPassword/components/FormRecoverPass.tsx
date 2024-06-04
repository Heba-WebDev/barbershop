import { SubmitHandler, useForm } from "react-hook-form"

type RecoverPassFormInputs={
    password:string,
    password2:string,
}

export const FormRecoverPass = () => {

    const {register,handleSubmit,formState:{errors}}=useForm<RecoverPassFormInputs>();


    const onsubmit:SubmitHandler<RecoverPassFormInputs>=()=>{

    }

  return (
    <form onSubmit={handleSubmit(onsubmit)} 
        className="flex flex-col  w-80  p-10 text-white
                    bg-black border border-orange-400
        "
        
        >
        <h1 className="text-orange-300 text-xl text-center mb-5">Reestablecer Contraseña:</h1>
        <div className="w-full mb-3">
            <p className="text-center mb-2">Escriba su nueva contraseña:</p>
            <input type="password"
                    {...register('password',{required:true})}
                    className="w-full bg-black border border-orange-300 text-orange-300 rounded-md px-2 py-1 text-center
                                focus:bg-orange-300 focus:text-black transition-all"
            />
        </div>
        <div className="">
            <p className="text-center mb-2">Repita su nueva contraseña:</p>
            <input type="password"
                    {...register('password2',{required:true})}
                    className="w-full bg-black border border-orange-300 text-orange-300 rounded-md px-2 py-1 text-center
                                focus:bg-orange-300 focus:text-black transition-all"
            />
        </div>
        <button type="submit" className="bg-orange-500 mt-5 py-2 rounded border border-orange-300 text-orange-100
                                             transition-all
                                            hover:bg-black  hover:text-orange-300">
                ¡Cambiar contraseña!
        </button>
    </form>
    )
}
