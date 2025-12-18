import { freeBoardList } from "@/features/community/mock/freeboardMock";
import BoardPage from "@/features/community/ui/BoardPage";
import WriteModal from "@/features/community/ui/WriteModal";

export default function FreeboardPage() {

  return (
      <BoardPage
            title="자유게시판"
            icon="📋"
            list={freeBoardList}
            ModalComponent={WriteModal}
            canWrite={true}
            onSubmit={(data) => console.log(data)}
          />
  );
}
