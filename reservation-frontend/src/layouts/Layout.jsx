import Header from '../components/Header';
import SidebarWrapper from '../components/SidebarWrapper';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../context/SidebarContext';

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex">
        <SidebarWrapper />

        <div className="flex-1">
          <Header />

          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
