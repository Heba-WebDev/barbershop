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
      <h3 className="font-medium">{day}</h3>
      <span className="bg-dark-gray px-3 rounded-xl">{dateHour}</span>
      <div>
        <button className="bg-dark-gray px-3 rounded-xl text-light-cayn text-3xl">
          +
        </button>
      </div>
      <div>
        <Switch className="data-[state]:checked:bg-red-600" />
      </div>
    </div>
  );
};
