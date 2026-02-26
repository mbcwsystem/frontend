import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createUserSchema, GENDER_OPTIONS, POSITION_OPTIONS } from '../model/user.schema';

import type { CreateAdminUserRequestDTO } from '../api/dto';
import type { CreateUserFormValues } from '../model/user.schema';

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

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAdminUserRequestDTO) => void;
  isPending: boolean;
}

const CreateUserDialog = ({ open, onClose, onSubmit, isPending }: CreateUserDialogProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { username: '', password: '', name: '', position: '' },
  });

  const position = watch('position');
  const gender = watch('gender');

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (values: CreateUserFormValues) => {
    onSubmit({
      ...values,
      email: values.email || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>직원 추가</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
          className="grid grid-cols-2 gap-4"
        >
          {/* 계정 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">아이디</Label>
            <Input id="username" placeholder="아이디" {...register('username')} />
            {errors.username && (
              <p className="text-destructive text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" placeholder="비밀번호" {...register('password')} />
            {errors.password && (
              <p className="text-destructive text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* 이름 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">이름</Label>
            <Input id="name" placeholder="이름" {...register('name')} />
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
            <Label htmlFor="phone">연락처</Label>
            <Input id="phone" placeholder="010-0000-0000" {...register('phone')} />
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="example@email.com" {...register('email')} />
            {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
          </div>

          {/* 입사일 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="hire_date">입사일</Label>
            <Input id="hire_date" type="date" {...register('hire_date')} />
          </div>

          {/* 시급 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="wage">시급</Label>
            <Input
              id="wage"
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
              {isPending ? <Spinner className="size-4" /> : '추가'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
