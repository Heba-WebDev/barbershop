import { Switch } from "@/components/ui/switch";

type DateDayProps = {
  day: string;
};

export const DateDay = ({ day }: DateDayProps) => {
  const hours = Array.from({ length: 24 }, (_, index) => `${index < 10 ? '0' : ''}${index}:00`);

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-[4rem]">
            <label
              htmlFor={`time-${day}`}
              className="ms-2 text-lg font-medium text-white-900 dark:text-gray-300"
            >
              {day.slice(0, 3)}
            </label>
          </div>
          <div className="w-full max-w-[7rem]">
            <select
              id={`start-time-${day}`}
              name={`start-time-${day}`}
              className="bg-red-50 border leading-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full max-w-[7rem]">
            <select
              id={`end-time-${day}`}
              name={`end-time-${day}`}
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center p-1.5 text-center "
            >
              <Switch className="data-[state]:checked:bg-red-600" />
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
