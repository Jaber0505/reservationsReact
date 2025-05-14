import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

const Sidebar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-gray-800 text-white w-[120px] min-h-screen p-2 shadow-lg">
      <ul className="space-y-4 text-lg">
        <li>
          <Link
            to="/"
            className="block px-2 py-1 transition-transform duration-200 hover:scale-105 hover:text-blue-400"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/profil"
            className="block px-2 py-1 transition-transform duration-200 hover:scale-105 hover:text-blue-400"
          >
            Profil
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
