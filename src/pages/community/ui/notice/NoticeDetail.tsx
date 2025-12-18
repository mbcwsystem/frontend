import { useParams } from 'react-router';

import { noticeList } from '@/features/community/mock/noticeMock';

export default function NoticeDetail() {
  const { id } = useParams();

  const notice = noticeList.find((item) => item.id === Number(id));

  if (!notice) {
    return <div>존재하지 않는 공지사항입니다.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <span>📢</span>
        <span>공지사항</span>
      </div>

      <div className="border-b" />

      <div className="flex items-center justify-between px-2">
        <div className="text-lg font-bold">{notice.title}</div>

        <div className="text-sm text-gray-500">
          {notice.author} · {notice.createdAt}
        </div>
      </div>

      <div className="whitespace-pre-line leading-7 text-sm px-2 ">{notice.content}</div>
    </div>
  );
}

