import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SidebarContext } from '../context/SidebarContext';
import Sidebar from './Sidebar';

const SidebarWrapper = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isOpen, sidebarRef } = useContext(SidebarContext);

  if (!isAuthenticated) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-30" />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 h-full transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>
    </>
  );
};

export default SidebarWrapper;
