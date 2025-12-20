import { Link } from 'react-router';

import {
  SHIFT_TYPE_LABEL,
  APPROVAL_STATUS_LABEL,
  APPROVAL_STATUS_STYLE,
} from '../../model/statusLabel';

import type { ShiftPost } from '../../mock/communityMock';
import Pagenation from '../Pagenation';
import { usePagenation } from '../../hooks/usePagenation';

const MAX_ITEMS = 10;

interface ShiftBoardPageProps {
  list: ShiftPost[];
}

export default function ShiftBoardPage({ list }: ShiftBoardPageProps) {
  const {
      currentPage,
      totalPages,
      currentItems,
      startIndex,
      setCurrentPage,
    } = usePagenation({
      items: [...list].reverse(),
      itemsPerPage: MAX_ITEMS,
    });

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
              <td className="py-4">{list.length - (startIndex + index)}</td>

              <td className="py-4">{SHIFT_TYPE_LABEL[item.shiftType]}</td>

              <td className="py-4">
                <Link to={`${item.id}`} className="hover:underline">
                  {item.author}
                </Link>
              </td>

              <td className="py-4">{item.requesterWorkTime}</td>

              <td className="py-4">{item.targetWorker}</td>

              <td className="py-4">{item.desiredWorkTime}</td>

              <td className="py-4">
                <span
                  className={`px-2 py-1 rounded text-xs
                    ${APPROVAL_STATUS_STYLE[item.approvalStatus]}`}
                >
                  {APPROVAL_STATUS_LABEL[item.approvalStatus]}
                </span>
              </td>

              <td className="py-4">{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagenation
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
    </div>
  );
}
