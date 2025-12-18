import { useState } from 'react';
import { Link } from 'react-router';

import { noticeList } from '@/features/community/mock/noticeMock';
import NoticeModal from '@/features/community/ui/NoticeModal';
import { ROLE } from '@/features/pay/model/role';

// 한 페이지에 최대 글 목록 수
const MAX_ITEMS = 10;

export default function NoticePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // 임의로 매니저로 설정 해두기
  const user = {
    role: ROLE.MANAGER,
  };

  const handleSubmit = (data: { title: string; content: string }) => {
    console.log(data);
    setIsOpen(false);
  };

  const totalPages = Math.ceil(noticeList.length / MAX_ITEMS);

  // 역순 적용
  const reversedList = [...noticeList].reverse();

  const startIndex = (currentPage - 1) * MAX_ITEMS;
  const currentItems = reversedList.slice(startIndex, startIndex + MAX_ITEMS);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>📢</span>
          <span>공지사항</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            placeholder="검색어를 입력하세요"
            className="border px-3 py-1 rounded-2xl text-sm"
          />
          {/* 매니저급 유저만 활성화 */}
          {user.role === ROLE.MANAGER && (
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-1 bg-mega text-white rounded"
            >
              작성
            </button>
          )}

          {isOpen && <NoticeModal onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />}
        </div>
      </div>

      <table className="w-full border-t">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            <th className="py-3 w-16 text-left">NO</th>
            <th className="py-3 text-left">제목</th>
            <th className="py-3 w-32 text-left">작성자</th>
            <th className="py-3 w-32 text-left">작성일자</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((notice, index) => (
            <tr key={notice.id} className="border-b text-sm">
              <td className="py-4">{noticeList.length - (startIndex + index)}</td>

              <td className="py-4">
                {/* 공지사항 제목 클릭 시 상세 페이지 이동 */}
                <Link to={`${notice.id}`} className="hover:underline">
                  {notice.title}
                </Link>
              </td>

              <td className="py-4">{notice.author}</td>
              <td className="py-4">{notice.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border text-sm
                  ${isActive ? 'bg-mega text-white' : 'hover:bg-gray-100'}`}
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
