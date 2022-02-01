import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IUserItem } from 'interfaces';
// Components
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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserItem>({
    mode: 'onBlur',
    defaultValues: userToUpdate ? userToUpdate : initialState,
  });

  const onSubmit = (user: IUserItem) => {
    callback(user);
    navigate('/users');
  };

  return (
    <>
      {(addUserLoading || updateUserLoading) && <Loader />}
      {(addUsererror || updateUserError) && <h2>Someting went wrong</h2>}

      <form onSubmit={handleSubmit(onSubmit)} className="form__wrapper">
        <div className="form__field">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            {...register('name', { required: true })}
            id="name"
            name="name"
            className="form__input"
          />
          {errors.name && (
            <span className="form__error">Field name is required</span>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="image" className="form__label">
            Image
          </label>
          <input
            {...register('image')}
            id="image"
            name="image"
            className="form__input"
          />
        </div>

        <div className="form__field">
          <label htmlFor="phone" className="form__label">
            Phone
          </label>
          <input
            {...register('phone', {
              required: 'Field phone is required',
              pattern: {
                value: /^(\+\d{1,2})?\(?\d{3}\)?\d{3}[-]\d{2}[-]\d{2}/,
                message:
                  'Please enter a valid phone number - +XX(XXX)XXX-XX-XX',
              },
            })}
            id="phone"
            name="phone"
            placeholder="+XX(XXX)XXX-XX-XX"
            className="form__input"
          />
          {errors.phone && (
            <span className="form__error">{errors.phone.message}</span>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input
            {...register('email', {
              required: 'Field email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter a valid email',
              },
            })}
            id="email"
            name="email"
            className="form__input"
          />
          {errors.email && (
            <span className="form__error">{errors.email.message}</span>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="position" className="form__label">
            Position
          </label>
          <input
            {...register('position', { required: true })}
            id="position"
            name="position"
            className="form__input"
          />
          {errors.position && (
            <span className="form__error">Field position is required</span>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="salary" className="form__label">
            Salary
          </label>
          <input
            {...register('salary')}
            id="salary"
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
            {...register('experience', {
              required: true,
              min: 1,
            })}
            id="experience"
            name="experience"
            type="number"
            className="form__input"
          />
          {/* {errors.experience && <span className="form__error">{errors.experience.message}</span>} */}
          {errors.experience?.type === 'required' ? (
            <span className="form__error">Field experience is required</span>
          ) : null}
          {errors.experience?.type === 'min' ? (
            <span className="form__error">
              The experience should be more than 1 year
            </span>
          ) : null}
        </div>

        <div className="form__field">
          <label htmlFor="gender" className="form__label">
            Gender
          </label>
          <select
            {...register('gender', { required: true })}
            id="gender"
            name="gender"
            className="form__select"
          >
            <option value="" disabled>
              Choose an option...
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <span className="form__error">Field gender is required</span>
          )}
        </div>

        <div className="form__actions">
          <button
            className="button button__primary"
            type="submit"
            disabled={!isValid}
          >
            {userToUpdate ? 'Update user' : 'Add New User'}
          </button>
          {userToUpdate && (
            <button
              className="button button__secondary"
              onClick={() => navigate('/users')}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default UserForm;
