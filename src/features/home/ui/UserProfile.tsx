import { User } from 'lucide-react';

interface UserProfileProps {
  icon?: React.ReactNode;
  name: string;
}

const UserProfile = () => {
  return (
    <div className=" flex gap-3 items-center">
      <div className=" rounded-full bg-amber-300 p-2">
        <User />
      </div>
      <h2 className=" text-lg">정경준</h2>
    </div>
  );
};

export default UserProfile;
