/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
import { Switch } from "@/components/ui/switch";

type DateDayProps = {
  day: string;

};

export const DateDay = ({ day}: DateDayProps) => {
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-[4rem]">
            <label
              htmlFor="monday"
              className="ms-2 text-lg font-medium text-white-900 dark:text-gray-300"
            >
              {day.slice(0, 3)}
            </label>
          </div>
          <div className="w-full max-w-[7rem]">
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                ></svg>
              </div>
              <input
                type="time"
                id="start-time-monday"
                name="start-time-monday"
                className="bg-red-50 border leading-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                required
              />
            </div>
          </div>
          <div className="w-full max-w-[7rem]">
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                ></svg>
              </div>
              <input
                type="time"
                id="end-time-monday"
                name="end-time-monday"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                required
              />
            </div>
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
