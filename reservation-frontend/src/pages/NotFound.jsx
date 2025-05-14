import { Link } from 'react-router-dom';
import CenteredContainer from 'components/ui/CenteredContainer';

const NotFound = () => {
  return (
    <CenteredContainer>
      <div className="text-center px-8">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-4">Page non trouvée</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retour à l'accueil
        </Link>
      </div>
    </CenteredContainer>
  );
};

export default NotFound;
