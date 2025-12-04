import { CalendarDays, X } from 'lucide-react';
import { useState } from 'react';

import type { ChangeEvent, FormEvent } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';

interface DayoffFormState {
  date: string;
  reason: string;
}

// 외부에서 모달 .열기 가능하도록
interface DayoffRequestModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const APPLICANT_NAME = '메박이'; // 추후 로그인한사람 이름으로 대체

export const DayoffRequestModal = ({ open, setOpen }: DayoffRequestModalProps) => {
  const [form, setForm] = useState<DayoffFormState>({
    date: '',
    reason: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('휴무 신청:', form);
    alert('휴무 신청이 완료되었습니다 (API 연결해야함)');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 하단 버튼 */}
      <DialogTrigger asChild>
        <Button className="h-9 rounded-[4px] border border-[#351F66] bg-transparent px-5 text-sm font-semibold text-[#351F66] hover:bg-[#f3eaff]">
          휴무 신청
        </Button>
      </DialogTrigger>

      {/* 모달 본문 */}
      <DialogContent className="max-w-xl rounded-2xl border-2 border-[#351F66] bg-white px-10 py-8">
        {/* 상단 타이틀 영역 */}
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#351F66]" />
              <DialogTitle className="text-lg font-semibold">휴무신청</DialogTitle>
            </div>
            <DialogClose className="text-gray-500 transition hover:text-gray-700">
              <X className="size-5" />
            </DialogClose>
          </div>
          <hr />
        </DialogHeader>

        {/* 폼 영역 */}
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          <div className="grid grid-cols-[80px_1fr] items-center gap-4 justify-center">
            {/* 신청인 */}
            <span className="text-center text-gray-600">신청인</span>
            <span className="text-center font-semibold text-gray-900">{APPLICANT_NAME}</span>

            {/*/!* 신청일자 *!/*/}
            <span className="self-start text-center text-gray-600">신청일자</span>
            <div className="relative flex flex-col gap-1">
              <Input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="h-9 w-full rounded-md border border-gray-300 pr-9 text-sm"
              />
              <span className="mt-1 text-[11px] text-gray-400">
                *주말 및 공휴일은 2일 전까지 신청 가능합니다
              </span>
            </div>

            {/*/!* 신청사유 *!/*/}
            <span className="self-start mt-1 text-center text-gray-600">신청사유</span>
            <Textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="신청 사유를 입력해주세요."
              className="w-full min-h-[100px] resize-none rounded-md border border-gray-300 bg-gray-50 text-sm"
            />
          </div>
          <p className="pt-4 text-center text-sm font-semibold text-gray-700">
            위 일자에 휴무를 신청합니다.
          </p>

          {/* 하단에 들어가는 버튼 */}
          <div className="pt-2">
            <Button
              type="submit"
              className="h-10 w-100 rounded-full bg-[#351F66] text-sm font-semibold text-white hover:bg-[#4b28d8]"
            >
              신청하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
