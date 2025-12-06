import { STATUS_TYPES } from '../model/status';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface WorkStatusFormProps {
  type: (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];
}

const WorkStatusForm = ({ type }: WorkStatusFormProps) => {
  const isAttendance = type === STATUS_TYPES.ATTENDANCE;

  return (
    <Card>
      <CardHeader>
        <CardTitle>관리자님 환영합니다</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
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
