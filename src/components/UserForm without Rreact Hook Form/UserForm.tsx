import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserItem } from 'interfaces';

import Loader from 'components/UI/Loader';

interface UserFormProps {
  addUserLoading?: boolean;
  addUsererror?: any;
  userToUpdate?: IUserItem;
  callback: (user: IUserItem) => void;
  updateUserLoading?: boolean;
  updateUserError?: any;
}

const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  image: '',
  position: '',
  salary: 0,
  experience: 0,
  gender: '',
};

const UserForm: FC<UserFormProps> = ({
  callback,
  addUserLoading,
  addUsererror,
  userToUpdate,
  updateUserLoading,
  updateUserError,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserItem>(
    userToUpdate ? userToUpdate : initialState
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback(user);
    navigate('/users');
  };

  return (
    <>
      {(addUserLoading || updateUserLoading) && <Loader />}
      {(addUsererror || updateUserError) && <h2>Someting went wrong</h2>}
      <form onSubmit={handleSubmit} className="form__wrapper">
        <div className="form__field">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            id="name"
            value={user.name}
            onChange={handleInputChange}
            name="name"
            type="text"
            className="form__input"
          />
        </div>

        <div className="form__field">
          <label htmlFor="image" className="form__label">
            Image
          </label>
          <input
            id="image"
            value={user.image}
            onChange={handleInputChange}
            name="image"
            type="text"
            className="form__input"
          />
        </div>

        <div className="form__field">
          <label htmlFor="position" className="form__label">
            Position
          </label>
          <input
            id="position"
            value={user.position}
            onChange={handleInputChange}
            name="position"
            type="text"
            className="form__input"
          />
        </div>

        <div className="form__field">
          <label htmlFor="salary" className="form__label">
            Salary
          </label>
          <input
            id="salary"
            // value={user.salary}
            onChange={handleInputChange}
            name="salary"
            type="number"
            className="form__input"
          />
        </div>

        <div className="form__field">
          <label htmlFor="experience" className="form__label">
            Experience
          </label>
          <input
            id="experience"
            // value={user.experience}
            onChange={handleInputChange}
            name="experience"
            type="number"
            className="form__input"
          />
        </div>

        <div className="form__field">
          <label htmlFor={user.gender} className="form__label">
            Gender
          </label>
          <select
            id={user.gender}
            name="gender"
            value={user.gender}
            onChange={handleSelectChange}
            className="form__select"
          >
            <option value="" disabled>
              Choose an option...
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button className="button button__primary" type="submit">
          {userToUpdate ? 'Update user' : 'Add New User'}
        </button>
      </form>
    </>
  );
};

export default UserForm;
