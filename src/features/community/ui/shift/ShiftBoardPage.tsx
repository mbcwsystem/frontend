import type { ShiftPost } from '@/features/community/mock/communityMock';

import {
  SHIFT_TYPE_LABEL,
  APPROVAL_STATUS_LABEL,
  APPROVAL_STATUS_STYLE,
} from '@/features/community/model/shiftLabel';

import { useState } from 'react';
import { Link } from 'react-router';

const MAX_ITEMS = 10;

interface ShiftBoardPageProps {
  list: ShiftPost[];
}

export default function ShiftBoardPage({ list }: ShiftBoardPageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(list.length / MAX_ITEMS);
  const reversedList = [...list].reverse();

  const startIndex = (currentPage - 1) * MAX_ITEMS;
  const currentItems = reversedList.slice(startIndex, startIndex + MAX_ITEMS);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <span>🔁</span>
        <span>근무 교대</span>
      </div>

      <table className="w-full border-t">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th className="py-3 w-16 text-left">순번</th>
            <th className="py-3 w-24 text-left">신청유형</th>
            <th className="py-3 w-32 text-left">신청자</th>
            <th className="py-3 w-48 text-left">신청자 근무시간</th>
            <th className="py-3 w-32 text-left">교대자</th>
            <th className="py-3 w-48 text-left">교대 근무시간</th>
            <th className="py-3 w-24 text-left">상태</th>
            <th className="py-3 w-32 text-left">작성일자</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id} className="border-b text-sm">
              <td className="py-4">
                {list.length - (startIndex + index)}
              </td>

              <td className="py-4">
                {SHIFT_TYPE_LABEL[item.shiftType]}
              </td>

              <td className="py-4">
                <Link to={`${item.id}`} className="hover:underline">
                  {item.author}
                </Link>
              </td>

              <td className="py-4">
                {item.requesterWorkTime}
              </td>

              <td className="py-4">
                {item.targetWorker}
              </td>

              <td className="py-4">
                {item.desiredWorkTime}
              </td>

              <td className="py-4">
                {/* 승인 상태 색상으로 구분 */}
                <span
                  className={`px-2 py-1 rounded text-xs
                    ${APPROVAL_STATUS_STYLE[item.approvalStatus]}`}
                >
                  {APPROVAL_STATUS_LABEL[item.approvalStatus]}
                </span>
              </td>

              <td className="py-4">
                {item.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border text-sm
                  ${
                    page === currentPage
                      ? 'bg-mega text-white'
                      : 'hover:bg-gray-100'
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}