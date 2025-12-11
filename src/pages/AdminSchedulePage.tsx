import { Menu } from 'lucide-react';
import { useState } from 'react';

import {
  AdminSchedule, // 근무 스케줄 입력
  AdminScheduleShift, // 근무교대/대체근무
  AdminScheduleDayoff, // 휴무신청
} from '@/features/schedule';

type AdminTab = 'base' | 'shift' | 'dayoff';

const AdminSchedulePage = () => {
  const [tab, setTab] = useState<AdminTab>('shift'); // 기본: 근무교대 화면

  const menuItemClass = (target: AdminTab) =>
    `flex w-full items-center px-3 py-2 text-left text-xs ${
      tab === target
        ? 'font-semibold text-[#351F66] underline decoration-2 underline-offset-4'
        : 'text-gray-700 hover:text-[#351F66]'
    }`;

  const renderContent = () => {
    switch (tab) {
      case 'base':
        return <AdminSchedule />;
      case 'shift':
        return <AdminScheduleShift />;
      case 'dayoff':
        return <AdminScheduleDayoff />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F3F4F6] px-8 py-6">
      {/* 상단 타이틀 */}
      <h1 className="text-xl font-bold text-gray-900">스케쥴 관리자</h1>
      <div className="mt-3 h-px w-full bg-[#E5E7EB]" />

      {/* 카드 부분*/}
      <div className="mt-4 flex gap-6">
        {/* 왼쪽영역 */}
        <aside className="w-50">
          <div className="content-center rounded-2xl border border-[#E5E7EB] bg-white p-4 text-sm w-[180px]">
            <div className="flex items-center gap-2 mb-3">
              <Menu className="h-5 w-5 text-gray-900" />
              <p className="text-sm font-bold text-gray-900">목록</p>
            </div>
            <button type="button" className={menuItemClass('base')} onClick={() => setTab('base')}>
              근무 스케줄 입력
            </button>

            <button
              type="button"
              className={`mt-1 ${menuItemClass('shift')}`}
              onClick={() => setTab('shift')}
            >
              근무교대 요청 목록
            </button>

            <button
              type="button"
              className={`mt-1 ${menuItemClass('dayoff')}`}
              onClick={() => setTab('dayoff')}
            >
              휴무신청 목록
            </button>
          </div>
        </aside>

        {/* 오른쪽 */}
        <section className="flex-1">{renderContent()}</section>
      </div>
    </div>
  );
};

export default AdminSchedulePage;
