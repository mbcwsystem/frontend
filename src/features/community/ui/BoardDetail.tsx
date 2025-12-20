import { useParams } from 'react-router';
import type { BoardDetailProps } from '../model/boardType';

export default function BoardDetail({
  title,
  icon,
  list,
  notFoundMessage = '존재하지 않는 게시글입니다.',
  children,
}: BoardDetailProps) {
  const { id } = useParams();

  const item = list.find((item) => item.id === Number(id));

  if (!item) {
    return <div>{notFoundMessage}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <span>{icon}</span>
        <span>{title}</span>
      </div>

      <div className="border-b" />

      <div className="flex items-center justify-between px-2">
        <div className="text-lg font-bold">{item.title}</div>

        <div className="text-sm text-gray-500">
          {item.author} · {item.createdAt}
        </div>
      </div>

      <div className="whitespace-pre-line leading-7 text-sm px-2">{item.content}</div>
      {/* 댓글 */}
      <div className="pt-20">{children}</div>
    </div>
  );
}
