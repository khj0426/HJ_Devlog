import { Component } from 'react';

import { ToastContainer } from '@/Component/Common/Toast/ToastContainer';
import ToastManager from '@/Component/Common/Toast/ToastManager';
class Example extends Component {
  createNotification = (type: any) => {
    return () => {
      switch (type) {
        case 'info':
          ToastManager.info('info', 'infoMessage', 500);
          break;
        case 'success':
          ToastManager.success('success', 'successMessage', 1000);
          break;
        case 'warning':
          ToastManager.warning('warning', 'warningMessage', 1500);
          break;
        case 'error':
          ToastManager.error('error', 'errorMessage', 2000);
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
