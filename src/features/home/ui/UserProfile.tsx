import { User } from 'lucide-react';

import { useUserQuery } from '@/entities/user/api/queries';

const UserProfile = () => {
  const { data: user } = useUserQuery();

  return (
    <div className=" flex gap-3 items-center">
      <div className=" rounded-full w-10 aspect-square bg-mega-secondary p-2">
        <User className=" text-white w-full h-full" />
      </div>
      <h2 className=" text-lg text-mega-secondary">{user?.name ?? '-'}</h2>
    </div>
  );
};

export default UserProfile;
