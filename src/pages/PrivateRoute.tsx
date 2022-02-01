import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  isAuth: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, isAuth }) => {
  return isAuth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
