import { FC } from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';

import UserItem from './UserItem';
import userEvent from '@testing-library/user-event';

const user = {
  id: '1b340174-bf31-483e-846a-333260213120',
  name: 'Jeremy Hessel',
  image: 'https://randomuser.me/api/portraits/men/78.jpg',
  position: 'Global Solutions Supervisor',
  salary: 3000,
  experience: 5,
  free: false,
  gender: 'male',
  phone: '+11(123)123-45-67',
  email: 'hessel@gmail.com',
};

const MockUserItem: FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <UserItem user={user} />
    </Provider>
  </BrowserRouter>
);

describe('User Item component', () => {
  it('Component should be rendered', () => {
    render(<MockUserItem />);
    const userNameElement = screen.getByText(/Jeremy Hessel/i);
    expect(userNameElement).toBeInTheDocument();
  });

  it("Confirmation modal should be shown is 'Delete User' button is clicked", async () => {
    // render(<MockUserItem />);
    // const userNameElement = screen.getByText(/Jeremy Hessel/i);
    // userEvent.click(screen.getByText(/Delete User/i));
    // expect(await screen.findByText(/Are you sure you want to delete profile/i)).toBeInTheDocument();
  });
});
