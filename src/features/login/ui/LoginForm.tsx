import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import loginSchema from '../model/schema';

import RHFInput from './RHFinput';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log('Login values:', values);
    // 여기서 API 호출
  };

  return (
    <Form {...form}>
      <form
        id="login-form"
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        className="flex flex-col gap-4"
      >
        <RHFInput form={form} name="userId" placeholder="ID" />

        <RHFInput form={form} name="password" placeholder="Password" />

        <Button type="submit" className="mt-2 w-full bg-mega">
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
