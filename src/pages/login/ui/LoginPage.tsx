import { FormCard } from '@/features/login';
import Logo from '@/shared/assets/logo/LogowithText_white.png';

const LoginPage = () => {
  return (
    <div className=" flex flex-col gap-10 relative w-full h-screen items-center justify-center after:absolute after:bg-mega after:h-[40%] after:w-full after:-z-10 after:top-0 after:left-0">
      <img src={Logo} alt="megabox_logo" className=" md:w-[300px] w-[200px] " />
      <FormCard />
      <p className=" text-sm text-mega-gray ">copyright megabox, all right resolved</p>
    </div>
  );
};

export default LoginPage;
