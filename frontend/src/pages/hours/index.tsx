/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
import { ServiceHoursNav } from "@/components/globals/ServiceHoursNav";
import { FC, useEffect, useState } from "react";
import { Data } from "./mock";
import axios from "axios";
import { DateDay } from "./dateDay";

type Hours = {
  day: string;
  dateHour: string;
};

export const HoursView: FC<Hours> = () => {
  const [value, setValue] = useState({});
  console.log(value);
  useEffect(() => {
    axios
      .get(
        "https://react-09-t-node.onrender.com/api/schedule/1?state=true&day=MONDAY"
      )
      .then((response) => {
        setValue(response.data);
      });
  }, []);

  return (
    <main className="p-2 px-4">
      <ServiceHoursNav />
      <h2 className="text-2xl font-bold pb-3">Disponibilidad</h2>
      <section className="bg-secondary-purple rounded-2xl grid gap-2 py-2 px-4">
        {Data.map((item) => {
          return <DateDay day={item.day} />;
        })}

        {/* {Data.map((item) => {
          return (
            <>
              <DateDay
                day={item.day}
                dateHour={`${item.initial_start_date} - ${item.initial_end_date}`}
              />
              <hr />
            </>
          );
        })} */}
      </section>
    </main>
  );
};
