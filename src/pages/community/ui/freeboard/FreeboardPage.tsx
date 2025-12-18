import { freeBoardList } from "@/features/community/mock/freeboardMock";
import BoardPage from "@/features/community/ui/BoardPage";

export default function FreeboardPage() {

  return (
      <BoardPage
            title="자유게시판"
            icon="📋"
            list={freeBoardList}
            canWrite={true}
          />
  );
}
