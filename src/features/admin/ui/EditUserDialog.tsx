import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { usePhoneInput } from '../model/usePhoneInput';
import { editUserSchema, GENDER_OPTIONS, POSITION_OPTIONS } from '../model/user.schema';

import type { AdminUserDTO, UpdateAdminUserRequestDTO } from '../api/dto';
import type { EditUserFormValues } from '../model/user.schema';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
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
import { Spinner } from '@/shared/components/ui/spinner';

interface EditUserDialogProps {
  open: boolean;
  user: AdminUserDTO | null;
  onClose: () => void;
  onSubmit: (memberId: number, data: UpdateAdminUserRequestDTO) => void;
  isPending: boolean;
}

const EditUserDialog = ({ open, user, onClose, onSubmit, isPending }: EditUserDialogProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
  });

  const position = watch('position');
  const gender = watch('gender');
  const phone = watch('phone');
  const handlePhoneChange = usePhoneInput(setValue);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        position: user.position,
        gender: user.gender ?? '',
        phone: user.phone ?? '',
        email: user.email ?? '',
        hire_date: user.hire_date ?? '',
        resign_date: user.resign_date ?? '',
        is_active: user.is_active,
        wage: user.wage,
      });
    }
  }, [user, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (values: EditUserFormValues) => {
    if (!user) return;
    onSubmit(user.id, {
      ...values,
      email: values.email || undefined,
      resign_date: values.resign_date || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>직원 정보 수정</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
          className="grid grid-cols-2 gap-4"
        >
          {/* 이름 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-name">이름</Label>
            <Input id="edit-name" placeholder="이름" {...register('name')} />
            {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
          </div>

          {/* 직급 */}
          <div className="flex flex-col gap-1.5">
            <Label>직급</Label>
            <Select
              value={position}
              onValueChange={(v) => setValue('position', v, { shouldValidate: true })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="직급 선택" />
              </SelectTrigger>
              <SelectContent>
                {POSITION_OPTIONS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.position && (
              <p className="text-destructive text-xs">{errors.position.message}</p>
            )}
          </div>

          {/* 성별 */}
          <div className="flex flex-col gap-1.5">
            <Label>성별</Label>
            <Select value={gender} onValueChange={(v) => setValue('gender', v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="성별 선택" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((g) => (
                  <SelectItem key={g.value} value={g.value}>
                    {g.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 연락처 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-phone">연락처</Label>
            <Input
              id="edit-phone"
              placeholder="010-0000-0000"
              value={phone ?? ''}
              onChange={handlePhoneChange}
            />
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label htmlFor="edit-email">이메일</Label>
            <Input
              id="edit-email"
              type="email"
              placeholder="example@email.com"
              {...register('email')}
            />
            {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
          </div>

          {/* 입사일 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-hire_date">입사일</Label>
            <Input id="edit-hire_date" type="date" {...register('hire_date')} />
          </div>

          {/* 퇴사일 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-resign_date">퇴사일</Label>
            <Input id="edit-resign_date" type="date" {...register('resign_date')} />
          </div>

          {/* 시급 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-wage">시급</Label>
            <Input
              id="edit-wage"
              type="number"
              placeholder="시급 입력"
              {...register('wage', { valueAsNumber: true })}
            />
            {errors.wage && <p className="text-destructive text-xs">{errors.wage.message}</p>}
          </div>

          <DialogFooter className="col-span-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner className="size-4" /> : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
