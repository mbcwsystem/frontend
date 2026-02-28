import { CalendarPlus, Clock, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import type { UserOption } from '../model/type';

interface ScheduleFormData {
  user_id: number;
  work_date: string;
  start_time: string;
  end_time: string;
}

interface ScheduleFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleFormData) => void;
  employees: UserOption[];
  initialData?: {
    id?: number;
    user_id?: number;
    work_date?: string;
    start_time?: string;
    end_time?: string;
  };
  isPending?: boolean;
}

const ScheduleFormModal = ({
  open,
  onClose,
  onSubmit,
  employees,
  initialData,
  isPending = false,
}: ScheduleFormModalProps) => {
  const [userId, setUserId] = useState<number | ''>('');
  const [workDate, setWorkDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const isEditMode = Boolean(initialData?.id);

  useEffect(() => {
    if (open && initialData) {
      setUserId(initialData.user_id ?? '');
      setWorkDate(initialData.work_date ?? '');
      setStartTime(initialData.start_time ?? '');
      setEndTime(initialData.end_time ?? '');
    }
  }, [open, initialData]);

  const resetForm = () => {
    setUserId('');
    setWorkDate('');
    setStartTime('');
    setEndTime('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isFormValid =
    userId !== '' && workDate.trim() !== '' && startTime.trim() !== '' && endTime.trim() !== '';

  const handleSubmit = () => {
    if (!isFormValid) return;
    onSubmit({
      user_id: userId as number,
      work_date: workDate,
      start_time: startTime,
      end_time: endTime,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent showCloseButton={false} className="p-0 overflow-hidden max-w-md">
        {/* Header */}
        <div className="bg-mega-secondary px-6 py-4 flex items-center gap-3">
          <CalendarPlus className="text-white size-5 shrink-0" />
          <DialogTitle className="text-white">스케줄 {isEditMode ? '수정' : '생성'}</DialogTitle>
          <DialogClose
            className="ml-auto text-white/80 hover:text-white transition-colors"
            onClick={handleClose}
            aria-label="닫기"
          >
            <X className="size-5" />
          </DialogClose>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Employee select */}
          <div className="space-y-1.5">
            <Label htmlFor="schedule-user" className="flex items-center gap-1.5">
              <User className="size-3.5 text-muted-foreground" />
              직원 선택
            </Label>
            <Select
              value={userId !== '' ? String(userId) : ''}
              onValueChange={(v) => setUserId(Number(v))}
            >
              <SelectTrigger id="schedule-user" className="w-full">
                <SelectValue placeholder="직원을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={String(employee.id)}>
                    {employee.name} ({employee.position})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Work date */}
          <div className="space-y-1.5">
            <Label htmlFor="schedule-date" className="flex items-center gap-1.5">
              <CalendarPlus className="size-3.5 text-muted-foreground" />
              근무 날짜
            </Label>
            <Input
              id="schedule-date"
              type="date"
              value={workDate}
              onChange={(e) => setWorkDate(e.target.value)}
            />
          </div>

          {/* Time fields */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="schedule-start-time" className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-muted-foreground" />
                시작 시간
              </Label>
              <Input
                id="schedule-start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="schedule-end-time" className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-muted-foreground" />
                종료 시간
              </Label>
              <Input
                id="schedule-end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 pb-6 gap-2 sm:flex-row">
          <Button variant="outline" onClick={handleClose} className="flex-1" disabled={isPending}>
            취소
          </Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={isPending || !isFormValid}>
            {isPending
              ? isEditMode
                ? '수정 중...'
                : '생성 중...'
              : isEditMode
                ? '수정하기'
                : '생성하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleFormModal;
