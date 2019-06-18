import { PATH_CONFIG } from './../config/path';
import { Modal } from 'antd';

export function handleAuthFailure() {
  Modal.error({
    title: 'Authentication Error',
    content: 'Your login verification has expired. Please login again',
    onOk: () => {
      location.href = PATH_CONFIG.signIn;
    }
  });
}
