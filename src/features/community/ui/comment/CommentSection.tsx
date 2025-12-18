import { useState } from 'react';
import type { Comment } from '@/features/community/mock/commentMock';
import { commentMockList } from '@/features/community/mock/commentMock';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

interface CommentSectionProps {
  postId: number;
  postType: 'notice' | 'freeboard';
  currentUserId: number;
}

export default function CommentSection({
  postId,
  postType,
  currentUserId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(
    commentMockList.filter(
    (c) => c.post_id === postId && c.post_type === postType,
  ),
  );

  const handleCreate = (content: string) => {
    const now = new Date().toISOString();

    // 임의 데이터 생성
    const newComment: Comment = {
      id: Date.now(),
      post_id: postId,
      post_type: 'freeboard',
      author_id: currentUserId,
      author_name: '나',
      author_position: '점장',
      content,
      created_at: now,
      updated_at: now,
    };

    setComments((prev) => [...prev, newComment]);
  };

  const handleUpdate = (id: number, content: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, content, updated_at: new Date().toISOString() } : c,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="mt-8 border-t pt-6 flex flex-col gap-4">
      <h3 className="font-bold">댓글 {comments.length}</h3>

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isMine={comment.author_id === currentUserId}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}

      <CommentForm onSubmit={handleCreate} />
    </div>
  );
}