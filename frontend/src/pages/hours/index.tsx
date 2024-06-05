import { ServiceHoursNav } from '@/components/globals/ServiceHoursNav'

export const HoursView = () => {
    return (
        <main>
            <ServiceHoursNav />
            <h2>Disponibilidad</h2>
            <section>
                <div>
                    <h3>Lun</h3><span>12:00</span> - <span>14:00</span>
                </div>
                <hr />
                <div>
                    <button>30 min</button>
                    <button>45 min</button>
                    <button>60 min</button>
                </div>
            </section>
        </main>
    )
}