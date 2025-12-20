import { Link } from 'react-router';
import type { DayoffPost } from '@/features/community/mock/communityMock';
import { APPROVAL_STATUS_LABEL, APPROVAL_STATUS_STYLE } from '../../model/statusLabel';
import Pagenation from '../Pagenation';
import { usePagenation } from '../../hooks/usePagenation';

interface DayoffBoardPageProps {
  list: DayoffPost[];
  canWrite: boolean;
}

const MAX_ITEMS = 10;

export default function DayoffBoardPage({
  list,
  canWrite,
}: DayoffBoardPageProps) {
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>🗓️</span>
          <span>휴무 신청</span>
        </div>

        {canWrite && (
          <button className="px-4 py-1 bg-mega text-white rounded">
            신청
          </button>
        )}
      </div>

      <table className="w-full border-t">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th className="py-3 w-16 text-left">순번</th>
            <th className="py-3 w-32 text-left">신청자</th>
            <th className="py-3 w-40 text-left">신청일자</th>
            <th className="py-3 w-24 text-left">상태</th>
            <th className="py-3 w-32 text-left">작성일자</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item, index) => {

            return (
              <tr key={item.id} className="border-b text-sm">
                <td className="py-4">
                  {list.length - (startIndex + index)}
                </td>

                <td className="py-4">
                    <Link
                    to={`${item.id}`}
                    className="hover:underline"
                    >
                    {item.author}
                    </Link>
                </td>

                <td className="py-4">{item.dayoffDate}</td>

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
            );
          })}
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