/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
import { Switch } from "@/components/ui/switch";

type DateDayProps = {
  day: string;
  dateHour: string;
};

export const DateDay = ({ day, dateHour }: DateDayProps) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="font-medium w-10">{day.slice(0, 3)}</h3>
      <div className="">
     
        <span className="bg-dark-gray px-3 rounded-xl">{dateHour}</span>
      </div>
      <div className="">
        <button className="bg-dark-gray px-3 rounded-xl text-light-cayn text-3xl">
          +
        </button>
      </div>
      <div className="">
        <Switch className="data-[state]:checked:bg-red-600" />
      </div>
    </div>
  );
};
