import { noticeList } from '@/features/community/mock/noticeMock';
import BoardDetail from '@/features/community/ui/BoardDetail';

export default function NoticeDetail() {

  return (
    <BoardDetail
      title="공지사항"
      icon="📢"
      list={noticeList}
      notFoundMessage="존재하지 않는 공지사항입니다."
    />
  );
}
