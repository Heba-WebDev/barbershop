export const NewPassView = () => {
  return (
    <section className="flex justify-center items-center h-[80vh]">
        <div className=" place-content-center bg-slate-800/70 text-slate-300 p-10 rounded-xl border border-cyan-300">
            <div className="mb-10 text-center text-indigo-200">
                <h1 className="text-3xl font-bold tracking-widest text-cyan-200">¡En horabuena!</h1>
                <p className="mt-5">Escriba a continuación <span className="font-bold">su nueva contraseña</span></p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6">
                <input type="password" id="password" name="password" placeholder="Contraseña nueva..." className="w-80 appearance-none rounded-full border-0 bg-slate-500/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                <div>
                <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirmar contraseña nueva..." className="w-80 appearance-none rounded-full border-0 bg-slate-500/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                <p id="validation" className="text-center text-orange-500 italic text-sm"></p>
                </div>
                <button id="showPw" className="rounded-full bg-cyan-500 p-2 px-4 text-white hover:bg-indigo-500 transition-all">
                     Combiar contraseña</button>
            </div>
        </div>
        
</section>
  )
}
