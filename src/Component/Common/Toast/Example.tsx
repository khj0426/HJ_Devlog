import React from 'react';

import { ToastContainer } from '@/Component/Common/Toast/ToastContainer';
import ToastManager from '@/Component/Common/Toast/ToastManager';
class Example extends React.Component {
  createNotification = (type: any) => {
    return () => {
      switch (type) {
        case 'info':
          ToastManager.info({
            newToast: {
              toastTitle: 'info',
              message: 'info message',
            },
          });
          break;
        case 'success':
          ToastManager.success({
            newToast: {
              toastTitle: 'success',
              message: 'success message',
            },
          });
          break;
        case 'warning':
          ToastManager.warning({
            newToast: {
              toastTitle: 'warning',
              message: 'warning message',
            },
          });
          break;
        case 'error':
          ToastManager.error({
            newToast: {
              toastTitle: 'error',
              message: 'error message',
            },
          });
          break;
      }
    };
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-info"
          onClick={this.createNotification('info')}
        >
          Info
        </button>
        <hr />
        <button
          className="btn btn-success"
          onClick={this.createNotification('success')}
        >
          Success
        </button>
        <hr />
        <button
          className="btn btn-warning"
          onClick={this.createNotification('warning')}
        >
          Warning
        </button>
        <hr />
        <button
          className="btn btn-danger"
          onClick={this.createNotification('error')}
        >
          Error
        </button>

        <ToastContainer enterTimeout={500} leaveTimeout={1000} />
      </div>
    );
  }
}

export default Example;
