import { CompanyForm } from './components/Form'

export const CompanyView = () => {
    return (
        <section className=" grid px-4 py-8">
            <header className=" py-6 flex flex-col gap-2">
                <h2 className=" text-xl text-center font-semibold">Registro de Propietario de Barbería</h2>
                <p className=" text-sm opacity-50 text-center">Registra tu negocio de barbería hoy mismo y descubre un mundo de oportunidades! No pierdas más tiempo y comienza a crecer tu negocio ahora</p>
            </header>
            <CompanyForm />
        </section>
    )
}