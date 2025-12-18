import CommentItem from './CommentItem';

import type { Comment } from '../../mock/commentMock';

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
  return (
    <ul className="flex flex-col gap-3">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isMine={comment.author_id === currentUserId}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
