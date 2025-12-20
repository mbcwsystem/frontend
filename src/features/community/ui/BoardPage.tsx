import { useState } from 'react';
import Pagenation from './Pagenation';
import { usePagenation } from '../hooks/usePagenation';

export interface Column<T> {
  header: string;
  key: keyof T | string;
  width?: string;
  render?: (item: T, index: number) => React.ReactNode;
}

interface BoardProps<T> {
  title: string;
  icon?: React.ReactNode;
  list: T[];
  canWrite?: boolean;
  onSubmit?: (data: any) => void;
  ModalComponent?: React.ComponentType<{ onClose: () => void; onSubmit: (data: any) => void }>;
  columns: Column<T>[];
}

export function BoardPage<T>({
  title,
  icon,
  list,
  canWrite,
  onSubmit,
  ModalComponent,
  columns,
}: BoardProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const { currentPage, totalPages, currentItems, setCurrentPage } = usePagenation({
    items: [...list].reverse(),
    itemsPerPage: 10,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold">
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </div>

        <div className="flex items-center gap-3">
          <input placeholder="검색어를 입력하세요" className="border px-3 py-1 rounded-2xl text-sm" />

          {canWrite && ModalComponent && onSubmit && (
            <button onClick={() => setIsOpen(true)} className="px-4 py-1 bg-mega text-white rounded">
              작성
            </button>
          )}

          {isOpen && ModalComponent && onSubmit && (
            <ModalComponent
              onClose={() => setIsOpen(false)}
              onSubmit={(data) => {
                onSubmit(data);
                setIsOpen(false);
                alert('등록이 완료되었습니다!');
              }}
            />
          )}
        </div>
      </div>

      <table className="w-full border-t">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            {columns.map((col) => (
              <th key={col.header} className={`py-3 ${col.width ? `w-${col.width}` : ''} text-left`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item, index) => (
            <tr key={(item as any).id} className="border-b text-sm">
              {columns.map((col) => (
                <td key={col.header} className="py-4">
                  {col.render ? col.render(item, index) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagenation totalPages={totalPages} currentPage={currentPage} onChangePage={setCurrentPage} />
    </div>
  );
}