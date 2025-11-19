import { LockIcon } from 'lucide-react';

import LoginForm from './LoginForm';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';

const FormCard = () => {
  return (
    <Card className="w-full max-w-sm gap-5">
      <CardHeader className=" grid-rows-[auto]">
        <CardTitle className=" flex gap-2 items-center text-xl text-mega">
          <LockIcon className=" text-mega" /> <h2>LOGIN</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-mega text-white">
          로그인
        </Button>
      </CardFooter> */}
    </Card>
  );
};

export default FormCard;
