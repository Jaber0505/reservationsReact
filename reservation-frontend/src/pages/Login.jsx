import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LoginForm redirectTo="/profil" />
    </div>
  );
};

export default Login;
