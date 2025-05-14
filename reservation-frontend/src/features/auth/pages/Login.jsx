import CenteredContainer from 'components/ui/CenteredContainer';
import LoginForm from 'features/auth/components/LoginForm';

const Login = () => {
  return (
    <CenteredContainer>
      <LoginForm redirectTo="/profil" />
    </CenteredContainer>
  );
};

export default Login;
