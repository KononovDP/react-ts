import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IUserItem } from 'interfaces';
import UserImage from 'components/UserImage';

interface UserCardProps {
  user: IUserItem;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="card">
      <div className="card__img">
        <UserImage user={user} />
      </div>
      <div className="card__text">
        <h3 className="card__title">
          {user.gender === 'female' ? (
            <span className="card__icon material-icons md-48">girl</span>
          ) : (
            <span className="card__icon material-icons md-48">boy</span>
          )}
          {user.name}
        </h3>
        <div className="card__descr">{user.position}</div>
        <div className="card__descr">${user.salary}</div>
        <div className="card__descr">{user.experience} years of experience</div>
        <Link
          to={`/users/${user.id}`}
          className="card__button button button__primary"
        >
          info
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
