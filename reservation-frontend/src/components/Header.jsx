import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SidebarContext } from '../context/SidebarContext';
import logo from '../assets/logo.png';

const Header = () => {
  const { isAuthenticated, logout, username } = useContext(AuthContext);
  const { isOpen, toggleSidebar } = useContext(SidebarContext);

  return (
    <header className="relative bg-white text-black px-4 py-3 shadow-md h-20">
      {/* Logo parfaitement centré */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <img src={logo} alt="Logo" className="h-16 w-auto" />
      </div>

      {/* Bouton ☰ à gauche */}
      {isAuthenticated && !isOpen && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <button
            onClick={toggleSidebar}
            className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-blue-600 hover:text-white"
          >
            ☰
          </button>
        </div>
      )}

      {/* Connexion / Déconnexion à droite */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-4">
        {!isAuthenticated ? (
          <>
            <a href="/login" className="text-black hover:text-blue-500">Connexion</a>
            <a href="/register" className="text-black hover:text-blue-500">Inscription</a>
          </>
        ) : (
          <>
            <span className="font-semibold">👤 {username}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded"
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
