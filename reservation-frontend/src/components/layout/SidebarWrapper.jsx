import Sidebar from 'components/layout/Sidebar';
import { useContext } from 'react';
import { SidebarContext } from 'context/SidebarContext';

const SidebarWrapper = () => {
  const { isOpen, sidebarRef } = useContext(SidebarContext);

  return (
    <div
      ref={sidebarRef}
      className={`absolute top-0 left-0 h-full z-40 transition-transform duration-300 bg-gray-800 text-white w-[120px] shadow-lg ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <Sidebar />
    </div>
  );
};

export default SidebarWrapper;
