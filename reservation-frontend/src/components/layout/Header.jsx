import { Link } from 'react-router-dom';
import { useContext } from 'react'; // Ajout de l'import pour useContext
import logo from 'assets/logo.png';
import useAuth from 'hooks/useAuth'; // Importation de notre hook useAuth
import { SidebarContext } from 'context/SidebarContext'; // Importation du SidebarContext

const Header = () => {
  const { isAuthenticated, logout, username, isLoggingOut } = useAuth();
  const { isOpen, toggleSidebar } = useContext(SidebarContext); // Utilisation du useContext pour SidebarContext

  return (
    <header className="relative bg-white text-black px-4 py-3 shadow-md h-20">
      {/* Logo centré */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </Link>
      </div>

      {/* ☰ menu à gauche */}
      {isAuthenticated && !isOpen && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <button
            onClick={toggleSidebar} // Fonction pour basculer l'état de la sidebar
            className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-blue-600 hover:text-white"
          >
            ☰
          </button>
        </div>
      )}

      {/* Boutons à droite */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-4">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="text-black hover:text-blue-500">Connexion</Link>
            <Link to="/register" className="text-black hover:text-blue-500">Inscription</Link>
          </>
        ) : (
          <>
            <span className="font-semibold">👤 {username}</span>
            {isLoggingOut ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Déconnexion...
              </div>
            ) : (
              <button
                onClick={logout} // Action de déconnexion
                className="bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded"
              >
                Déconnexion
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
