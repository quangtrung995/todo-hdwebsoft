import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export enum AlertType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const showNotification = ({ type, msg }) => {
  const options: ToastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'dark'
  };
  switch (type) {
    case AlertType.INFO:
      return toast.info(msg, options);
    case AlertType.WARNING:
      return toast.warn(msg, options);
    case AlertType.ERROR:
      return toast.error(msg, options);
    case AlertType.SUCCESS:
      return toast.success(msg, options);
    default:
      return toast(msg, options);
  }
};
