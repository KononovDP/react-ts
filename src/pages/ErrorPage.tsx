import { FC } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: FC = () => {
  return (
    <div className="error-page">
      <h1>Something went wrong</h1>
      <button className="button button__primary">
        <Link to="/">Go to Home page</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
