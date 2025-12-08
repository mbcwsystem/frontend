import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import workStatusSchema, { type WorkStatusSchemaType } from '../model/schema';
import { STATUS_TYPES } from '../model/status';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form } from '@/shared/components/ui/form';
import RHFInput from '@/shared/components/ui/RHFInput';

interface WorkStatusFormProps {
  type: (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];
}

const WorkStatusForm = ({ type }: WorkStatusFormProps) => {
  const isAttendance = type === STATUS_TYPES.ATTENDANCE;

  const form = useForm({
    resolver: zodResolver(workStatusSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = (values: WorkStatusSchemaType) => {
    console.log('Login values:', values);
    // 여기서 API 호출
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>관리자님 환영합니다</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form id="work-status-form" className=" flex flex-col gap-2">
            <RHFInput form={form} name="username" placeholder="ID" />
            <RHFInput form={form} name="password" placeholder="PASSWORD" />
          </form>
        </Form>

        {isAttendance ? (
          <>
            <Button className="w-full">출근</Button>
            <Button className="w-full" variant="secondary">
              퇴근
            </Button>
          </>
        ) : (
          <>
            <Button className="w-full">휴식</Button>
            <Button className="w-full" variant="secondary">
              복귀
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkStatusForm;
