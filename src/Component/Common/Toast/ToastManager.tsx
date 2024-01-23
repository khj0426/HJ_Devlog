import type { ToastPropsType } from '@/Component/Common/Toast/Toast';

import { EventEmitter } from 'events';

import { uuid4 } from '@sentry/utils';

type toast = Omit<ToastPropsType, 'onRequestHide'>;

class ToastManager extends EventEmitter {
  toastList!: toast[];

  constructor() {
    super();
    this.toastList = [];
  }

  private create(
    title: string,
    message?: string,
    timeOut?: number,
    type?: string
  ) {
    const defaultNotify = {
      id: uuid4(),
      type: 'info',
      title: null,
      message: null,
      timeOut: 5000,
    };
    this.toastList.push(
      Object.assign(defaultNotify, {
        ...defaultNotify,
        title,
        message,
        timeOut,
        type,
      })
    );

    this.emitChange();
  }

  info(title: string, message?: string, timeOut?: number) {
    this.create(title, message, timeOut, 'info');
  }

  success(title: string, message?: string, timeOut?: number) {
    this.create(title, message, timeOut, 'success');
  }

  warning(title: string, message?: string, timeOut?: number) {
    this.create(title, message, timeOut, 'warning');
  }

  error(title: string, message?: string, timeOut?: number) {
    this.create(title, message, timeOut, 'error');
  }

  private removeAll() {
    this.toastList.length = 0;
    this.emitChange();
  }

  remove(noti: toast) {
    this.toastList = this.toastList.filter((toast) => toast.id !== noti.id);
    this.emitChange();
  }

  private emitChange() {
    this.emit('change', this.toastList);
  }

  addChangeListener(callback: (..._args: any) => void) {
    this.addListener('change', callback);
  }

  removeChangeListener(callback: (..._args: any) => void) {
    this.removeListener('change', callback);
  }
}

export default new ToastManager();
