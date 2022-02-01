import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchUserQuery } from 'store/usersService';
// Components
import UserItem from 'components/UserItem';
import Loader from 'components/UI/Loader';

const UserPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchUserQuery(id || '');

  return (
    <>
      <h1>User Page</h1>
      {isLoading && <Loader />}
      {error && <h2>Someting went wrong</h2>}
      {data && <UserItem user={data} />}
    </>
  );
};

export default UserPage;
