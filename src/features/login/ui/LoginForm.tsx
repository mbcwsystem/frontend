import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { authQueries } from '../api/queries';
import loginSchema, { type LoginSchemaType } from '../model/schema';

import RHFInput from './RHFinput';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate } = useMutation({
    ...authQueries.login,
    onSuccess: () => {
      // 로그인 성공 → 페이지 이동
      console.log('success');
    },
  });

  const onSubmit = (values: LoginSchemaType) => {
    // console.log('Login values:', values);
    // 여기서 API 호출
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        id="login-form"
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        className="flex flex-col gap-4"
      >
        <RHFInput form={form} name="username" placeholder="ID" />

        <RHFInput type="password" form={form} name="password" placeholder="Password" />

        <Button type="submit" className="mt-2 w-full bg-mega">
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
