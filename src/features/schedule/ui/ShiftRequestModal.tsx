import { CalendarDays, X } from 'lucide-react';
import { useState } from 'react';

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
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';

interface ShiftFormState {
  requestDate: string; // 신청일자
  type: 'shift' | 'alternate'; // 근무교대 / 대체근무
  targetName: string; // 대상인
  targetDate: string; // 대상일자
}

const APPLICANT_NAME = '메박이'; // 추후 로그인 사용자 이름으로 대체

export const ShiftRequestModal = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ShiftFormState>({
    requestDate: '',
    type: 'shift',
    targetName: '',
    targetDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('근무 교대 신청:', form);
    alert('근무 교대 신청이 완료되었습니다 (API 연결해야함)');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 하단 버튼 */}
      <DialogTrigger asChild>
        <Button className="h-9 rounded-[4px] border border-[#351F66] bg-transparent px-5 text-sm font-semibold text-[#351F66] hover:bg-[#f3eaff]">
          {' '}
          근무교대 신청
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl rounded-2xl border-2 border-[#351F66] bg-white px-10 py-8">
        {/* 상단 타이틀 */}
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#351F66]" />
              <DialogTitle className="text-lg font-semibold">근무교대 신청</DialogTitle>
            </div>
            <DialogClose className="text-gray-500 transition hover:text-gray-700">
              <X className="h-5 w-5" />
            </DialogClose>
          </div>
          <hr />
        </DialogHeader>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          <div className="grid grid-cols-[80px_1fr] items-start gap-4">
            {/* 신청인 */}
            <span className="text-center text-gray-600">신청인</span>
            <span className="text-center font-semibold text-gray-900">{APPLICANT_NAME}</span>

            {/* 신청일자 + 근무 교대/대체근무 선택 */}
            <span className="self-start text-center text-gray-600">신청일자</span>
            <div className="flex flex-col gap-2">
              <Input
                name="requestDate"
                type="date"
                value={form.requestDate}
                onChange={handleChange}
                className="h-9 w-full rounded-md border border-gray-300 text-sm"
              />

              <RadioGroup
                className="mt-1 flex justify-center gap-6"
                value={form.type}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    type: value as ShiftFormState['type'],
                  }))
                }
              >
                <label className="flex items-center gap-2 text-sm">
                  <RadioGroupItem value="shift" id="shift" />
                  <span>근무교대</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <RadioGroupItem value="alternate" id="alternate" />
                  <span>대체근무</span>
                </label>
              </RadioGroup>
            </div>

            {/* 대상인 */}
            <span className="self-start text-center text-gray-600">대상인</span>
            <Input
              name="targetName"
              value={form.targetName}
              onChange={handleChange}
              placeholder="대상자 이름을 입력하세요."
              className="h-9 w-full rounded-md border border-gray-300 text-sm"
            />

            {/* 대상일자 */}
            <span className="self-start text-center text-gray-600">대상일자</span>
            <Input
              name="targetDate"
              type="date"
              value={form.targetDate}
              onChange={handleChange}
              className="h-9 w-full rounded-md border border-gray-300 text-sm"
            />
          </div>

          {/* 안내 문구 */}
          <p className="pt-4 text-center text-sm font-semibold text-gray-700">
            위 일자에 근무교대를 신청합니다.
          </p>

          {/* 하단 버튼 */}
          <div className="pt-2">
            <Button
              type="submit"
              className="h-10 w-full rounded-full bg-[#351F66] text-sm font-semibold text-white hover:bg-[#4b28d8]"
            >
              신청하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
