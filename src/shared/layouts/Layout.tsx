import { Outlet } from 'react-router';
import { Header } from '../components/ui/Heade';

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
