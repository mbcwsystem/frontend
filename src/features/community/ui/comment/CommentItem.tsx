import { useState } from 'react';
import type { Comment } from '../../mock/commentMock';
import { formatDateTime } from '@/features/community/model/formatData';

interface CommentItemProps {
  comment: Comment;
  isMine: boolean;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

export default function CommentItem({
  comment,
  isMine,
  onUpdate,
  onDelete,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(comment.content);

  const isEdited = comment.created_at !== comment.updated_at;

  const handleCancel = () => {
    setValue(comment.content); // 원래 내용 복원
    setIsEditing(false);
  };

  return (
    <div className="border rounded p-3 text-sm bg-gray-50">
      <div className="flex justify-between">
        <div>
          <span className="font-semibold">{comment.author_name}</span>
          <span className="ml-2 text-xs text-gray-500">
            {comment.author_position}
          </span>

          <div className="text-xs text-gray-400 mt-1">
            {formatDateTime(comment.created_at)}
            {isEdited && (
              <span className="ml-2">
                · 수정됨 ({formatDateTime(comment.updated_at)})
              </span>
            )}
          </div>
        </div>

        {isMine && !isEditing && (
          <div className="flex gap-2 text-xs">
            <button onClick={() => setIsEditing(true)}>수정</button>
            <button onClick={() => onDelete(comment.id)}>삭제</button>
          </div>
        )}
      </div>

      {isEditing ? (
        <>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border mt-2 p-2"
          />

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                onUpdate(comment.id, value);
                setIsEditing(false);
              }}
              className="text-xs px-3 py-1 bg-mega text-white rounded"
            >
              저장
            </button>

            <button
              onClick={handleCancel}
              className="text-xs px-3 py-1 border rounded"
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <p className="mt-2 whitespace-pre-line">{comment.content}</p>
      )}
    </div>
  );
}