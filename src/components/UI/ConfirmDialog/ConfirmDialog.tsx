import { FC } from 'react';

interface ConfirmDialogProps {
  title: string;
  onConfirm: () => void;
  onDenied: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  title,
  onConfirm,
  onDenied,
}) => {
  return (
    <div className="dialog__overlay" onClick={onDenied}>
      <div className="dialog">
        <h2 className="dialog__title">{title}</h2>
        <div className="dialog__actions">
          <button
            onClick={onConfirm}
            className="dialog__button button button__primary"
          >
            Yes
          </button>
          <button
            onClick={onDenied}
            className="dialog__button button button__secondary"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
