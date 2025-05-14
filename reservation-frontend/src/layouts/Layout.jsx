import Header from 'components/layout/Header';
import SidebarWrapper from 'components/layout/SidebarWrapper';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from 'context/SidebarContext';

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="relative h-auto">
        <SidebarWrapper />
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
