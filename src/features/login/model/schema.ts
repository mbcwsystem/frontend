import { z } from 'zod';

const loginSchema = z.object({
  userId: z.string().min(4, {
    message: 'UserID must be at least 2 characters.',
  }), // userID에 대한 스키마 정의
  password: z.string().min(6, {
    message: 'Password must be at least 8 characters.',
  }), // userPassword에 대한 스키마 정의
});

export default loginSchema;

export type LoginSchemaType = z.infer<typeof loginSchema>;
