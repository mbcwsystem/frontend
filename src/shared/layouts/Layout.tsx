import { Outlet } from 'react-router';

import { Header } from '../../widgets/ui/Header';
import { Sidebar } from '../../widgets/ui/Sidebar';

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 pt-14 ml-18">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
