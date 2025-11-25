import type { PropsWithChildren } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';

interface ContentsCardProps extends PropsWithChildren {
  profile?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const ContentsCard = ({ profile, title, description, children, className }: ContentsCardProps) => {
  return (
    <Card className={cn(' min-w-2xs', className)}>
      <CardHeader>
        <CardTitle className=" flex gap-3 items-center">{profile ? profile : title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {/* TODOS : 여기 optional하게 수정 */}
        {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* TODOS : 여기더..... optional하게 수정 */}
      {/* <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter> */}
    </Card>
  );
};

export default ContentsCard;
