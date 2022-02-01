import { FC, ChangeEvent } from 'react';
import { sortedBy, filterBy } from 'store/usersSlice';
import { useAppSelector, useAppDispatch } from 'hooks/redux-hooks';

const UsersFilter: FC = () => {
  const sortedValue = useAppSelector((state) => state.users.sortedValue);
  const dispatch = useAppDispatch();

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortedBy(e.target.value));
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBy(e.target.value));
  };

  return (
    <>
      <div className="box">
        <label className="form__label">Sorted by:</label>
        <select
          className="form__select"
          value={sortedValue}
          onChange={handleSort}
        >
          <option value="" disabled>
            Choose an option...
          </option>
          <option value="salary">Salary</option>
          <option value="experience">Experience</option>
        </select>
      </div>
      <div className="box">
        <label className="form__label">Gender:</label>
        <label className="form__label">
          <input
            type="radio"
            value="male"
            onChange={handleFilter}
            name="gender"
          />{' '}
          Male
        </label>
        <label className="form__label">
          <input
            type="radio"
            value="female"
            onChange={handleFilter}
            name="gender"
          />{' '}
          Female
        </label>
        <label className="form__label">
          <input
            type="radio"
            value="other"
            onChange={handleFilter}
            name="gender"
          />{' '}
          Other
        </label>
        <label className="form__label">
          <input
            type="radio"
            value="all"
            onChange={handleFilter}
            name="gender"
          />{' '}
          All
        </label>
      </div>
    </>
  );
};

export default UsersFilter;
