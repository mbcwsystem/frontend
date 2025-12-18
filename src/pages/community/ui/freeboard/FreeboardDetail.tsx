import { freeBoardList } from "@/features/community/mock/freeboardMock";
import BoardDetail from '@/features/community/ui/BoardDetail';

export default function FreeBoardDetail() {

  return (
    <BoardDetail
      title="자유게시판"
      icon="📢"
      list={freeBoardList}
      notFoundMessage="존재하지 않는 자유게시글입니다."
    />
  );
}