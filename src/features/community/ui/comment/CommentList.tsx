import { usePagenation } from '../../hooks/usePagenation';
import Pagenation from '../../ui/Pagenation';

import CommentItem from './CommentItem';

import type { Comment } from '../../mock/commentMock';

const MAX_ITEMS = 10;

interface CommentListProps {
  comments: Comment[];
  currentUserId: number;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

export default function CommentList({
  comments,
  currentUserId,
  onUpdate,
  onDelete,
}: CommentListProps) {
  const reversedList = [...comments].reverse();

  const { currentPage, totalPages, currentItems, setCurrentPage } = usePagenation({
    items: reversedList,
    itemsPerPage: MAX_ITEMS,
  });

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-3">
        {currentItems.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isMine={comment.author_id === currentUserId}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>

      <Pagenation totalPages={totalPages} currentPage={currentPage} onChangePage={setCurrentPage} />
    </div>
  );
}
