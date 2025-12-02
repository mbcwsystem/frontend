// src/features/schedule/components/ShiftRequestDialog.tsx

import { useState } from 'react';
// shadcn 경로는 프로젝트에 맞게 수정해줘!
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';

export const ShiftRequestDialog = () => {
  const [targetName, setTargetName] = useState('');
  const [date, setDate] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 나중에 여기서 mutation으로 API 호출
    console.log({ targetName, date, timeRange, reason });
    alert('교대 신청이 임시로 콘솔에 찍혔어요 😄 (나중에 API 연결 예정)');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">근무 교대 신청</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>근무 교대 신청</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="targetName">교대 요청할 직원</Label>
            <Input
              id="targetName"
              placeholder="예: 김민수"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="date">날짜</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="timeRange">시간대</Label>
            <Input
              id="timeRange"
              placeholder="예: 09:00 ~ 18:00"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="reason">사유</Label>
            <Textarea
              id="reason"
              placeholder="사유를 간단히 적어주세요."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <Button type="submit">신청하기</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
