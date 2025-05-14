import CenteredContainer from 'components/ui/CenteredContainer';
import RegisterForm from 'features/auth/components/RegisterForm';

const Register = () => {
  return (
    <CenteredContainer>
      <RegisterForm redirectTo="/profil" />
    </CenteredContainer>
  );
};

export default Register;
