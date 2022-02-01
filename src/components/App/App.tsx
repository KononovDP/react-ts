import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
// Pages
import HomePage from 'pages/HomePage';
import UsersPage from 'pages/UsersPage';
import UserPage from 'pages/UserPage';
import AddUserPage from 'pages/AddUserPage';
import EditUserPage from 'pages/EditUserPage';
import ErrorPage from 'pages/ErrorPage';
import PrivateRoute from 'pages/PrivateRoute';
// Components
import Layout from 'components/Layout';
import Loader from 'components/UI/Loader';

const App: FC = () => {
  const { email } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.loading);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserPage />} />
          <Route
            path="users/:id/edit"
            element={
              <PrivateRoute isAuth={!!email}>
                <EditUserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="users/new"
            element={
              <PrivateRoute isAuth={!!email}>
                <AddUserPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>

      {isLoading && <Loader />}
    </>
  );
};

export default App;
