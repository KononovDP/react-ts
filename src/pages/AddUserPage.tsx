import { FC } from 'react';
import { useAddUserMutation } from 'store/usersService';
// Components
import UserForm from 'components/UserForm';

const AddUserPage: FC = () => {
  const [addUser, { isLoading, error }] = useAddUserMutation();

  return (
    <>
      <h1>AddUserPage</h1>
      <UserForm
        callback={addUser}
        addUserLoading={isLoading}
        addUsererror={error}
      />
    </>
  );
};

export default AddUserPage;
