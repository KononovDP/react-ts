import { FC, MouseEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { login, logout } from 'store/authSlice';
import { turnOnLoading, turnOffLoading } from 'store/loadingSlice';
import { useAppSelector, useAppDispatch } from 'hooks/redux-hooks';
import firebase from '../../firebase';

const Header: FC = () => {
  const userEmail = useAppSelector((state) => state.auth.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(turnOnLoading());
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((response: any) => {
        dispatch(login(response.additionalUserInfo.profile.email));
      })
      .catch((error: any) => console.log('Error', error))
      .finally(() => dispatch(turnOffLoading()));
  };

  const handleLogout = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <Link to="/" className="header__logo">
              HomePage
            </Link>

            {userEmail ? (
              <>
                <p>Hey, {userEmail}</p>
                <nav>
                  <ul className="nav__list">
                    <li className="nav__item">
                      <NavLink to="users" className="nav__link" end>
                        Users
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink to="users/new" className="nav__link">
                        Add User
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <button
                        className="button button__primary"
                        onClick={handleLogout}
                      >
                        LogOut
                      </button>
                    </li>
                  </ul>
                </nav>
              </>
            ) : (
              <nav>
                <ul className="nav__list">
                  <li className="nav__item">
                    <NavLink to="users" className="nav__link">
                      Users
                    </NavLink>
                  </li>
                  <li className="nav__item">
                    <button
                      className="button button__primary"
                      onClick={handleLogin}
                    >
                      LogIn
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
