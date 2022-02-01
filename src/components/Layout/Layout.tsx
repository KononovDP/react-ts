import { FC } from 'react';
import { Outlet } from 'react-router-dom';
// Components
import Header from 'components/Header';

const Layout: FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
