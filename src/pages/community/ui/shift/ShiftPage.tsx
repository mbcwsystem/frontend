import type { ShiftPost } from '@/features/community/mock/communityMock';

import { communityPostList } from '@/features/community/mock/communityMock';
import ShiftBoardPage from '@/features/community/ui/shift/ShiftBoardPage';

export default function ShiftPage() {
  const shiftList = communityPostList.filter(
    (post): post is ShiftPost => post.category === 'SHIFT',
  );

  return <ShiftBoardPage list={shiftList} />;
}
