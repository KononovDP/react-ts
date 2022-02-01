import { FC } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';

import Header from './Header';

const MockHeader: FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Header />
    </Provider>
  </BrowserRouter>
);

jest.mock('../../firebase', () => new Promise((resolve) => resolve(true)));

describe('Header component', () => {
  it('Logo should be rendered', () => {
    render(<MockHeader />);
    const logoElement = screen.getByText(/HomePage/i);
    expect(logoElement).toBeInTheDocument();
  });

  it('Login button should be visible', () => {
    render(<MockHeader />);
    expect(screen.getByText(/LogIn/i)).toBeInTheDocument();
  });

  it('Logout button should not be visible', () => {
    render(<MockHeader />);
    expect(screen.queryByText(/LogOut/i)).not.toBeInTheDocument();
  });

  // it('Login button should not be visible after user login', async () => {
  //   render(<MockHeader />);
  //   const loginElement = screen.getByText(/LogIn/i);
  //   userEvent.click(loginElement);
  //   expect(loginElement).not.toBeInTheDocument();
  // });

  // it('Logout button should be visible after user login', async () => {
  //   render(<MockHeader />);
  //   const loginElement = screen.getByText(/LogIn/i);
  //   userEvent.click(loginElement);
  //   expect(await screen.findByText(/LogOut/i)).toBeInTheDocument();
  // });
});
