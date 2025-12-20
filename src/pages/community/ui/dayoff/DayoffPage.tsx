import { communityPostList } from '@/features/community/mock/communityMock';
import DayoffBoardPage from '@/features/community/ui/dayoff/DayoffBoard';

export default function DayoffPage() {
  const dayoffList = communityPostList.filter(
    (post) => post.category === 'DAYOFF'
  );

  return (
    <>
      <DayoffBoardPage list={dayoffList} canWrite />
    </>
  );
}
