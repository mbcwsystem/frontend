import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { usePhoneInput } from '../model/usePhoneInput';
import {
  createUserFormSchema,
  GENDER_OPTIONS,
  POSITION_OPTIONS,
  userFormSchema,
} from '../model/user.schema';

import type {
  AdminUserDTO,
  CreateAdminUserRequestDTO,
  UpdateAdminUserRequestDTO,
} from '../api/dto';
import type { UserFormValues } from '../model/user.schema';

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

type UserFormDialogProps = {
  open: boolean;
  onClose: () => void;
  isPending: boolean;
} & (
  | {
      mode: 'create';
      user?: never;
      onSubmit: (data: CreateAdminUserRequestDTO) => void;
    }
  | {
      mode: 'edit';
      user: AdminUserDTO | null;
      onSubmit: (memberId: number, data: UpdateAdminUserRequestDTO) => void;
    }
);

const UserFormDialog = ({
  open,
  mode,
  user,
  onClose,
  onSubmit,
  isPending,
}: UserFormDialogProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(mode === 'create' ? createUserFormSchema : userFormSchema),
    defaultValues: mode === 'create' ? { username: '', password: '', name: '', position: '' } : {},
  });

  const position = watch('position');
  const gender = watch('gender');
  const phone = watch('phone');
  const handlePhoneChange = usePhoneInput(setValue);

  useEffect(() => {
    if (mode === 'edit' && user) {
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
  }, [mode, user, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (values: UserFormValues) => {
    if (mode === 'create') {
      onSubmit({
        username: values.username!,
        password: values.password!,
        name: values.name,
        position: values.position,
        gender: values.gender,
        phone: values.phone,
        email: values.email || undefined,
        hire_date: values.hire_date,
        wage: values.wage,
      });
    } else {
      if (!user) return;
      onSubmit(user.id, {
        name: values.name,
        position: values.position,
        gender: values.gender,
        phone: values.phone,
        email: values.email || undefined,
        hire_date: values.hire_date,
        resign_date: values.resign_date || undefined,
        is_active: values.is_active,
        wage: values.wage,
      });
    }
  };

  const isCreate = mode === 'create';

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isCreate ? '직원 추가' : '직원 정보 수정'}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
          className="grid grid-cols-2 gap-4"
        >
          {/* 생성 전용: 계정 / 비밀번호 */}
          {isCreate && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username">아이디</Label>
                <Input id="username" placeholder="아이디" {...register('username')} />
                {errors.username && (
                  <p className="text-destructive text-xs">{errors.username.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-destructive text-xs">{errors.password.message}</p>
                )}
              </div>
            </>
          )}

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
            <Input
              id="phone"
              placeholder="010-0000-0000"
              value={phone ?? ''}
              onChange={handlePhoneChange}
            />
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

          {/* 수정 전용: 퇴사일 */}
          {!isCreate && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="resign_date">퇴사일</Label>
              <Input id="resign_date" type="date" {...register('resign_date')} />
            </div>
          )}

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
              {isPending ? <Spinner className="size-4" /> : isCreate ? '추가' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
