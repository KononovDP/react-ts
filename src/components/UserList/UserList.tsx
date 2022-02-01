import { FC, useState, useEffect, useMemo } from 'react';
import { useFetchAllUsersQuery } from 'store/usersService';
import { useAppSelector } from 'hooks/redux-hooks';
import { IUserItem } from 'interfaces';
// Components
import Loader from 'components/UI/Loader';
import UserCard from 'components/UserCard';
import UsersFilter from 'components/UsersFilter';

const UserList: FC = () => {
  const { data: users = [], isLoading, error } = useFetchAllUsersQuery(100);
  const sortedValue = useAppSelector((state) => state.users.sortedValue);
  const filteredValue = useAppSelector((state) => state.users.filteredValue);

  const sortedUsers = useMemo(() => {
    if (sortedValue) {
      return [...users].sort((a: IUserItem, b: IUserItem): any => {
        if (sortedValue === 'salary') {
          return a.salary > b.salary ? 1 : -1;
        } else if (sortedValue === 'experience') {
          return a.experience > b.experience ? 1 : -1;
        }
      });
    }
    return users;
  }, [users, sortedValue]);

  const sortedAndFilteredUsers = useMemo(() => {
    if (filteredValue && filteredValue !== 'all') {
      return sortedUsers.filter((user) => user.gender === filteredValue);
    }
    return sortedUsers;
  }, [sortedUsers, filteredValue]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="wrapper">
        <aside className="sidebar">
          <UsersFilter />
        </aside>
        <div className="content">
          {error && <h2>Someting went wrong</h2>}
          <h1>UserList</h1>
          {sortedAndFilteredUsers?.length ? (
            <>
              <div className="card__wrapper">
                {sortedAndFilteredUsers.map((user: IUserItem) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
              <p style={{ marginTop: 40 }}>
                Number of users: {sortedAndFilteredUsers.length}
              </p>
            </>
          ) : (
            <h2 className="text-center">There are no items to show</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
