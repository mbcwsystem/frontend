import { useState } from 'react';
import { Link } from 'react-router';

interface BoardItem {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

interface BoardPageProps {
  title: string;
  icon: string;
  list: BoardItem[];
  canWrite: boolean;
  onSubmit?: (data: { title: string; content: string }) => void;
  ModalComponent?: React.ComponentType<{
    onClose: () => void;
    onSubmit: (data: { title: string; content: string }) => void;
  }>;
}

const MAX_ITEMS = 10;

export default function BoardPage({
  title,
  icon,
  list,
  canWrite,
  onSubmit,
  ModalComponent,
}: BoardPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const totalPages = Math.ceil(list.length / MAX_ITEMS);
  const reversedList = [...list].reverse();

  const startIndex = (currentPage - 1) * MAX_ITEMS;
  const currentItems = reversedList.slice(startIndex, startIndex + MAX_ITEMS);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>{icon}</span>
          <span>{title}</span>
        </div>

        <div className="flex items-center gap-3">
          <input
            placeholder="검색어를 입력하세요"
            className="border px-3 py-1 rounded-2xl text-sm"
          />

          {canWrite && (
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-1 bg-mega text-white rounded"
            >
              작성
            </button>
          )}

          {isOpen && ModalComponent && onSubmit && (
            <ModalComponent
              onClose={() => setIsOpen(false)}
              onSubmit={(data) => {
                onSubmit(data);
                setIsOpen(false);
              }}
            />
          )}
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
          {currentItems.map((item, index) => (
            <tr key={item.id} className="border-b text-sm">
              <td className="py-4">{list.length - (startIndex + index)}</td>
              <td className="py-4">
                <Link to={`${item.id}`} className="hover:underline">
                  {item.title}
                </Link>
              </td>
              <td className="py-4">{item.author}</td>
              <td className="py-4">{item.createdAt}</td>
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
                  ${page === currentPage ? 'bg-mega text-white' : 'hover:bg-gray-100'}`}
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
