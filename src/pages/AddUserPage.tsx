import { FC } from 'react';
import UserForm from 'components/UserForm';
import { useAddUserMutation } from 'store/usersService';

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
