import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux-hooks';
import { login } from 'store/authSlice';
import { turnOnLoading, turnOffLoading } from 'store/loadingSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(turnOnLoading());
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(login(user.email));
      })
      .then(() => navigate('/'))
      .catch((error) => console.log('error', error))
      .finally(() => dispatch(turnOffLoading()));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form__wrapper">
        <div className="form__field">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={handleEmailChange}
            type="email"
            className="form__input"
          />
        </div>
        <div className="form__field">
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            className="form__input"
          />
        </div>
        <div className="form__field jc-center">
          <button className="button button__primary" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
