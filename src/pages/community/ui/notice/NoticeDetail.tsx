import { useParams } from 'react-router';

import { communityPostList } from '@/features/community/mock/communityMock';
import BoardDetail from '@/features/community/ui/BoardDetail';
import CommentSection from '@/features/community/ui/comment/CommentSection';

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>잘못된 접근입니다.</div>;
  }

  const noticeList = communityPostList.filter((post) => post.category === 'NOTICE');

  return (
    <BoardDetail
      title="공지사항"
      icon="📢"
      list={noticeList}
      notFoundMessage="존재하지 않는 공지사항입니다."
    >
      {/* currentUserId - 임의 설정 */}
      <CommentSection postId={Number(id)} postType="notice" currentUserId={1} />
    </BoardDetail>
  );
}
