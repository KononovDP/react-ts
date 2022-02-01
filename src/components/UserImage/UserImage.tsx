import { FC } from 'react';
import { IUserItem } from 'interfaces';
// Assets
import maleImage from 'assets/images/boy.png';
import femaleImage from 'assets/images/girl.png';
import userImage from 'assets/images/user.png';

interface UserImageProps {
  user: IUserItem;
}

const UserImage: FC<UserImageProps> = ({ user }) => {
  const getImageSrc = () => {
    if (!user.image) {
      if (user.gender === 'male') {
        return maleImage;
      } else if (user.gender === 'female') {
        return femaleImage;
      } else {
        return userImage;
      }
    }
    return user.image;
  };

  return <img src={getImageSrc()} alt={user.name} />;
};

export default UserImage;
