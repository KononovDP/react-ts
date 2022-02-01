import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchUserQuery, useUpdateUserMutation } from 'store/usersService';
// Components
import UserForm from 'components/UserForm';
import Loader from 'components/UI/Loader';

const EditUserPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchUserQuery(id || '');
  const [updateUser, { isLoading: isLoadingUpdate, error: errorUpdate }] =
    useUpdateUserMutation();

  return (
    <>
      <h1>Edit User Page</h1>
      {isLoading && <Loader />}
      {error && <h2>Someting went wrong</h2>}
      <UserForm
        userToUpdate={data}
        callback={updateUser}
        updateUserLoading={isLoadingUpdate}
        updateUserError={errorUpdate}
      />
    </>
  );
};

export default EditUserPage;
