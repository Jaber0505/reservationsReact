import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

// Auth pages
import Login from 'features/auth/pages/Login';
import Register from 'features/auth/pages/Register';

// User page
import Profile from 'features/user/pages/Profile';

// Routing & Layout
import PrivateRoute from 'routes/PrivateRoute';
import Layout from 'layouts/Layout';

// Context
import { ConfirmModalProvider } from 'context/ConfirmModalContext';

const App = () => {
  return (
    <ConfirmModalProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="profil"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ConfirmModalProvider>
  );
};

export default App;
