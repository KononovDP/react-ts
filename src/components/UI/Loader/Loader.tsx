import { FC } from 'react';

const Loader: FC = () => {
  return (
    <div className="loader__wrapper">
      <div className="loader__outer">
        <div className="loader__inner"></div>
      </div>
    </div>
  );
};

export default Loader;
