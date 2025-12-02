import { useState } from 'react';

import { ShiftRequestModal } from '@/features/schedule/components/ShiftRequestModal';
import { DayoffRequestModal } from '@/features/schedule/components/DayoffRequestModal';

type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

interface Shift {
  id: number;
  day: DayKey;
  employeeName: string;
  role?: 'STAFF' | 'MANAGER';
  startTime: string;
  endTime: string;
}

const dayLabels: { key: DayKey; label: string }[] = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
];

// 데모 날짜(11/9~11/15)
const dayDates: Record<DayKey, number> = {
  sun: 9,
  mon: 10,
  tue: 11,
  wed: 12,
  thu: 13,
  fri: 14,
  sat: 15,
};

// 근무 인원 mock
const mockShifts: Shift[] = [
  { id: 1, day: 'mon', employeeName: '정한율', startTime: '12:00', endTime: '17:00' },
  { id: 2, day: 'mon', employeeName: '김민주', startTime: '14:00', endTime: '20:00' },
  { id: 3, day: 'tue', employeeName: '지민', startTime: '10:00', endTime: '17:00' },
  { id: 4, day: 'fri', employeeName: '하늘', startTime: '21:00', endTime: '24:00' },
  { id: 4, day: 'fri', employeeName: '하늘', startTime: '21:00', endTime: '24:00' },

];

const SchedulePage = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [shiftModalOpen, setShiftModalOpen] = useState(false);

  const handlePrevWeek = () => setWeekOffset((prev) => prev - 1);
  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);
  const handleThisWeek = () => setWeekOffset(0);

  const weekRangeLabel = '11/9 ~ 11/15';

  return (
    <div className="flex flex-col gap-4 bg-[#f3f4f6] p-6">
      {/* 상단 타이틀 */}
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold">스케줄</h1>

        <div className="flex items-center gap-3">
          {/*<AdminSchedule />*/}
          <ShiftRequestModal open={shiftModalOpen} setOpen={setShiftModalOpen} />
          <DayoffRequestModal />
        </div>
      </div>

      {/* 메인 카드 */}
      <section className="min-h-[60vh] rounded-xl border border-[#d7dce8] bg-white px-8 py-6 shadow-sm">
        {/* 컨트롤 영역 */}
        <div className="mb-6 flex items-center justify-between">
          {/* 내 스케줄 */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="h-4 w-4" />
            <span>내 스케줄</span>
          </label>

          {/* 주차 정보 */}
          <div className="flex items-center gap-6 text-sm font-semibold text-gray-700">
            <button
              type="button"
              onClick={handlePrevWeek}
              className="rounded-md border px-3 py-1 hover:bg-gray-100"
            >
              {'<'}
            </button>

            <span>{weekRangeLabel}</span>

            <button
              type="button"
              onClick={handleNextWeek}
              className="rounded-md border px-3 py-1 hover:bg-gray-100"
            >
              {'>'}
            </button>
          </div>

          {/* 이번 주 버튼 */}
          <button
            type="button"
            onClick={handleThisWeek}
            className="rounded-md border px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            이번 주
          </button>
        </div>

        {/* 스케줄 테이블 */}
        <div className="overflow-x-auto overflow-y-hidden rounded-lg border border-[#e1e4ef] bg-[#f6f8fc]">
          <div className="min-w-[880px]">
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 border-b bg-[#f6f8fc] text-center text-xs font-semibold">
              {dayLabels.map((day) => {
                const isSun = day.key === 'sun';
                const isSat = day.key === 'sat';

                const colorClass = isSun
                  ? 'text-red-500'
                  : isSat
                  ? 'text-blue-500'
                  : 'text-gray-700';

                return (
                  <div
                    key={day.key}
                    className="border-l border-[#e1e4ef] px-3 py-3 first:border-l-0"
                  >
                    <span className={colorClass}>{day.label}</span>
                  </div>
                );
              })}
            </div>

            {/* 내용 */}
            <div className="grid grid-cols-7">
              {dayLabels.map((day) => {
                const shiftsForDay = mockShifts.filter((shift) => shift.day === day.key);
                const shiftCount = shiftsForDay.length;

                return (
                  <div
                    key={day.key}
                    className="min-h-[340px] border-l border-[#e1e4ef] bg-white p-3 first:border-l-0 text-xs"
                  >
                    {/* 날짜 + 인원수 */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">
                        {dayDates[day.key]}
                      </span>
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
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2">
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
      </section>
    </div>
  );
};

export default SchedulePage;
