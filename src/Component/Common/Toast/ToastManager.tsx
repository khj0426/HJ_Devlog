import type { ToastPropsType } from '@/Component/Common/Toast/Toast';

import { EventEmitter } from 'events';

import React from 'react';

import { uuid4 } from '@sentry/utils';

type toastWithOutType = Omit<ToastPropsType, 'onRequestHide' | 'type'>;

type toast = Omit<ToastPropsType, 'onRequestHide'>;

class ToastManager extends EventEmitter {
  toastList!: toast[];

  constructor() {
    super();
    this.toastList = [];
  }

  create(newToast: toast) {
    const defaultNotify = {
      id: uuid4(),
      type: 'info',
      title: null,
      message: null,
      timeOut: 5000,
    };
    this.toastList.push(Object.assign(defaultNotify, newToast));
    console.log(this.toastList);

    this.emitChange();
  }

  info({ newToast }: { newToast: toastWithOutType }) {
    this.create({
      ...newToast,
      type: 'info',
    });
  }

  success({ newToast }: { newToast: toastWithOutType }) {
    this.create({
      ...newToast,
      type: 'success',
    });
  }

  warning({ newToast }: { newToast: toastWithOutType }) {
    this.create({
      ...newToast,
      type: 'warning',
    });
  }

  error({ newToast }: { newToast: toastWithOutType }) {
    this.create({
      ...newToast,
      type: 'error',
    });
  }

  removeAll() {
    this.toastList.length = 0;
    this.emitChange();
  }

  remove(noti: any) {
    this.toastList = this.toastList.filter((toast) => toast.id !== noti.id);

    this.emitChange();
  }

  emitChange() {
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
