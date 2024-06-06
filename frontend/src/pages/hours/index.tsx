/* eslint-disable semi */
/* eslint-disable indent */
import { ServiceHoursNav } from '@/components/globals/ServiceHoursNav'
import { DateDay } from './dateDay'
import { FC } from 'react'

type Hours = {
    day: string;
    dateHour: string;
}

export const HoursView: FC<Hours> = () => {
    return (
      <main className="p-2 px-4">
        <ServiceHoursNav />
        <h2 className="text-2xl font-bold pb-3">Disponibilidad</h2>
        <section className="bg-secondary-purple rounded-2xl grid gap-4 py-2 px-4">
          <DateDay day="Lun" dateHour="12:00" />
          <hr />
          <DateDay day="Mar" dateHour="12:00" />
          <hr />
          <DateDay day="Mie" dateHour="12:00" />
          <hr />
          <DateDay day="Jue" dateHour="12:00" />
          <hr />
          <DateDay day="Vie" dateHour="12:00" />
          <hr />
          <DateDay day="Sab" dateHour="12:00" />
          <hr />
          <DateDay day="Dom" dateHour="12:00" />
        </section>
        <div className="flex justify-evenly pt-3">
          <button className="bg-secondary-purple px-7 py-3 rounded-2xl hover:bg-[#68CBD9] hover:text-[#2C293A]">
            30 min
          </button>
          <button className="bg-secondary-purple px-7 py-3 rounded-2xl hover:bg-[#68CBD9] hover:text-[#2C293A]">
            45 min
          </button>
          <button className="bg-secondary-purple px-7 py-3 rounded-2xl hover:bg-[#68CBD9] hover:text-[#2C293A]">
            60 min
          </button>
        </div>
      </main>
    );
}