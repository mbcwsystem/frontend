import { z } from 'zod';

export const userFormSchema = z.object({
  // 생성 전용 (수정 시 optional)
  username: z.string().min(2, '아이디는 2자 이상이어야 합니다.').max(30).optional(),
  password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다.').optional(),
  // 공통
  name: z.string().min(1, '이름을 입력해주세요.'),
  position: z.string().min(1, '직급을 선택해주세요.'),
  gender: z.string().optional(),
  phone: z.string().optional(),
  email: z.union([z.email('올바른 이메일을 입력해주세요.'), z.literal('')]).optional(),
  hire_date: z.string().optional(),
  wage: z.number({ message: '시급은 숫자로 입력해주세요.' }).min(0).optional(),
  // 수정 전용
  resign_date: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

// 생성 시 username/password 필수 강제
export const createUserFormSchema = userFormSchema.extend({
  username: z.string().min(2, '아이디는 2자 이상이어야 합니다.').max(30),
  password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다.'),
});

export const POSITION_OPTIONS = ['크루', '리더', '바이저', '점장'] as const;

export const GENDER_OPTIONS = [
  { value: '남', label: '남' },
  { value: '여', label: '여' },
] as const;
