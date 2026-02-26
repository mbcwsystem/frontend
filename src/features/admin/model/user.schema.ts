import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(2, '아이디는 2자 이상이어야 합니다.').max(30),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
  name: z.string().min(1, '이름을 입력해주세요.'),
  position: z.string().min(1, '직급을 선택해주세요.'),
  gender: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('올바른 이메일을 입력해주세요.').optional().or(z.literal('')),
  hire_date: z.string().optional(),
  wage: z.number({ message: '시급은 숫자로 입력해주세요.' }).min(0).optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

export const POSITION_OPTIONS = ['크루', '리더', '바이저', '점장'] as const;

export const GENDER_OPTIONS = [
  { value: '남', label: '남' },
  { value: '여', label: '여' },
] as const;
