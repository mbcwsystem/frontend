import { useState } from 'react';

interface WriteModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => void;
}

export default function WriteModal({ onClose, onSubmit }: WriteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-[500px] rounded-lg p-6 flex flex-col gap-4"
        // 모달 내부 클릭이벤트 막기
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-bold text-black">공지사항 작성</div>

        <input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            border px-3 py-2 rounded
            text-black
            placeholder:text-gray-400
            focus:outline-none
          "
        />

        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="
            border px-3 py-2 rounded h-40 resize-none
            text-black
            placeholder:text-gray-400
            focus:outline-none
          "
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 border rounded text-black">
            취소
          </button>
          <button
            // 등록 시 내용 등록 [ 타이틀 / 본문 ]
            onClick={() => onSubmit({ title, content })}
            className="px-4 py-1 bg-mega text-white rounded"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
