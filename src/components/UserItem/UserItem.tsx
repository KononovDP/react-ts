import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
import { useRemoveUserMutation } from 'store/usersService';
import { IUserItem } from 'interfaces';
// Components
import Loader from 'components/UI/Loader';
import ConfirmDialog from 'components/UI/ConfirmDialog';
import UserImage from 'components/UserImage';

interface IUser {
  user: IUserItem;
}

const UserItem: FC<IUser> = ({ user }) => {
  const navigate = useNavigate();
  const [removeUser, { isLoading, error }] = useRemoveUserMutation();
  const { email } = useAppSelector((state) => state.auth);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);

  const handleRemove = (): void => {
    setConfirmDialog(true);
  };

  const confirmRemoving = async () => {
    setConfirmDialog(false);
    await removeUser(user.id);
    navigate('/users');
  };

  const deniedRemoving = (): void => {
    setConfirmDialog(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <h2>Someting went wrong</h2>}
      {confirmDialog && (
        <ConfirmDialog
          title={`Are you sure you want to delete profile of ${user.name}`}
          onConfirm={confirmRemoving}
          onDenied={deniedRemoving}
        />
      )}
      <div className="user__wrapper">
        <button className="button button__primary" onClick={() => navigate(-1)}>
          <span className="material-icons md-24">arrow_back</span>
          back to user list
        </button>
        <div className="user">
          <div className="user__img">
            <UserImage user={user} />
          </div>
          <div className="user__text">
            <h2>Name: {user.name}</h2>
            <h3>
              Email:
              <a href={`mailto:${user.email}`} target="_blank" rel="noreferrer">
                {user.email}
              </a>
            </h3>
            <h3>
              Phone: <a href={`tel: ${user.phone}`}>{user.phone}</a>
            </h3>
            <h3>Posiiton: {user.position}</h3>
            <h3>Experience: {user.experience}</h3>
            <h3>Salary: {user.salary}</h3>
          </div>
        </div>
        {!!email && (
          <div className="user__action">
            <button
              className="button button__primary"
              onClick={() => handleRemove()}
            >
              Delete user
            </button>
            <Link
              className="button button__primary"
              to={`/users/${user.id}/edit`}
            >
              Edit user
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default UserItem;
