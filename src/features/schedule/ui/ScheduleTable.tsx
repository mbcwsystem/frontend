import { dayLabels, dayDates } from '../model/schedule.model';

import type { Shift } from '../model/schedule.model';

interface ScheduleTableProps {
  shifts: Shift[];
}

export const ScheduleTable = ({ shifts }: ScheduleTableProps) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden rounded-lg border border-[#e1e4ef] bg-[#f6f8fc]">
      <div className="min-w-[880px]">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-b bg-[#f6f8fc] text-center text-xs font-semibold">
          {dayLabels.map((day) => {
            const isSun = day.key === 'sun';
            const isSat = day.key === 'sat';

            const colorClass = isSun ? 'text-red-500' : isSat ? 'text-blue-500' : 'text-gray-700';

            return (
              <div key={day.key} className="border-l border-[#e1e4ef] px-3 py-3 first:border-l-0">
                <span className={colorClass}>{day.label}</span>
              </div>
            );
          })}
        </div>

        {/* 내용 */}
        <div className="grid grid-cols-7">
          {dayLabels.map((day) => {
            const shiftsForDay = shifts.filter((shift) => shift.day === day.key);
            const shiftCount = shiftsForDay.length;

            return (
              <div
                key={day.key}
                className="min-h-[340px] border-l border-[#e1e4ef] bg-white p-3 first:border-l-0 text-xs"
              >
                {/* 날짜 + 인원수 */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800">{dayDates[day.key]}</span>
                  <span className="rounded-full bg-[#e0f4ff] px-3 py-1 text-[11px] font-semibold text-[#008acb]">
                    {shiftCount}명
                  </span>
                </div>

                {/* 근무 없음 */}
                {shiftCount === 0 && (
                  <div className="flex h-full items-center justify-center text-[11px] text-gray-400">
                    근무 없음
                  </div>
                )}

                {/* 근무자 리스트 */}
                <div className="flex flex-col gap-3">
                  {shiftsForDay.map((shift) => (
                    <div
                      key={shift.id}
                      className="rounded-md border border-[#c0cde0] bg-[#f8fbff] px-3 py-2"
                    >
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-2">
                        <span className="text-[11px] font-semibold text-gray-800">
                          {shift.employeeName}
                        </span>

                        <span className="text-[11px] text-gray-600 md:inline-block">
                          {shift.startTime} ~ {shift.endTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
