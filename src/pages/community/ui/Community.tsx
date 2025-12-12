import { TextAlignStart } from 'lucide-react';
import { Outlet } from 'react-router';

import { ListButton } from '@/features/community';
import { Card, CardContent } from '@/shared/components/ui/card';

export default function Communiity() {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-bold">커뮤니티</div>
      <div className="flex gap-10">
        <Card variant="blueSide" className="max-h-60 min-w-30">
          <CardContent className="flex flex-col justify-start items-start gap-6">
            <div className="flex gap-3 items-center">
              <TextAlignStart size={16} strokeWidth={3} />
              <div className="font-bold sm:text-sm text-xs">목록</div>
            </div>
            <div>
              <ListButton label="공지사항" to="notice" />
              <ListButton label="근무교대" to="shift" />
              <ListButton label="휴무신청" to="dayoff" />
              <ListButton label="자유게시판" to="freeboard" />
            </div>
          </CardContent>
        </Card>
        <Card variant="blueMain" className="min-h-140">
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
