import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon, User2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import loginSchema from '../model/schema';

import { Button } from '@/shared/components/ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

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
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2 w-full bg-mega">
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
