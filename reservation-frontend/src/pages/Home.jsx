import CenteredContainer from 'components/ui/CenteredContainer';

const Home = () => {
  return (
    <CenteredContainer>
      <div className="text-center">
        <h1 className="text-4xl font-bold">Bienvenue sur notre application</h1>
        <p className="mt-4 text-gray-600">Inscrivez-vous ou connectez-vous pour commencer.</p>
      </div>
    </CenteredContainer>
  );
};

export default Home;
