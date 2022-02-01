import { FC, ChangeEvent } from 'react';
import { sortedBy, filterBy } from 'store/usersSlice';
import { useAppSelector, useAppDispatch } from 'hooks/redux-hooks';

interface RadioButton {
  value: string;
  text: string;
}

const UsersFilter: FC = () => {
  const sortedValue = useAppSelector((state) => state.users.sortedValue);
  const filteredValue = useAppSelector((state) => state.users.filteredValue);
  const dispatch = useAppDispatch();

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortedBy(e.target.value));
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBy(e.target.value));
  };

  const genderRadios: RadioButton[] = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
    { value: 'other', text: 'Other' },
    { value: 'all', text: 'All' },
  ];

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
        {genderRadios.map(({ value, text }) => (
          <label className="form__label" key={value}>
            <input
              type="radio"
              value={value}
              onChange={handleFilter}
              name="gender"
              checked={value === filteredValue}
            />
            {text}
          </label>
        ))}
      </div>
    </>
  );
};

export default UsersFilter;
