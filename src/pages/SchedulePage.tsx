import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';

import {
  ShiftRequestModal,
  DayoffRequestModal,
  ScheduleControls,
  ScheduleTable,
  mockShifts,
} from '@/features/schedule';

const SchedulePage = () => {
  const [, setWeekOffset] = useState(0);

  const [searchParams] = useSearchParams();
  const [dayoffModalOpen, setDayoffModalOpen] = useState(false);

  useEffect(() => {
    const modal = searchParams.get('modal');
    setDayoffModalOpen(modal === 'dayoff');
  }, [searchParams]);

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
          {/*관리자 페이지 버튼 */}
          <Link to="/admin/schedule">
            <button className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-[#351F66] text-[#351F66] hover:bg-[#f3eaff] p-0">
              <Shield className="h-5 w-5" />
            </button>
          </Link>
          {/* 모달 버튼들 */}
          <ShiftRequestModal />
          <DayoffRequestModal open={dayoffModalOpen} setOpen={setDayoffModalOpen} />
        </div>
      </div>

      {/* 메인 카드 */}
      <section className="min-h-[60vh] rounded-xl border border-[#d7dce8] bg-white px-8 py-6 shadow-sm">
        {/* 컨트롤 영역 */}
        <ScheduleControls
          weekRangeLabel={weekRangeLabel}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          onThisWeek={handleThisWeek}
        />

        {/* 스케줄 테이블 */}
        <ScheduleTable shifts={mockShifts} />
      </section>
    </div>
  );
};

export default SchedulePage;
