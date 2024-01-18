'use client';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styled from 'styled-components';

import { Toast } from '@/Component/Common/Toast/Toast';
import './index.css';

interface ToastListProps {
  notifications?: any[];
  onRequestHide?: Function;
  enterTimeout: number;
  leaveTimeout: number;
}

const ToastListContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  right: 0;
  z-index: 999;
  width: 320px;
  max-height: calc(100%-30px);
  padding: 0px 15px;
`;

export const ToastList = ({
  notifications = [],
  onRequestHide,
  enterTimeout = 400,
  leaveTimeout = 400,
}: ToastListProps) => {
  const handleRequestHide = (toastList: any) => {
    if (onRequestHide) {
      onRequestHide(toastList);
    }
  };

  const toastItems = notifications.map((noti) => {
    const key = noti.id ?? new Date().getTime().toString();

    return (
      <CSSTransition
        timeout={{
          enter: enterTimeout,
          exit: leaveTimeout,
        }}
        key={key}
        classNames="notification"
      >
        <Toast
          key={'toast'}
          id={noti.id}
          type={noti.type as 'info' | 'warning' | 'success' | 'error'}
          toastTitle={noti.toastTitle}
          message={noti.message}
          onClick={noti.onClick}
          onRequestHide={() => handleRequestHide(noti)}
        />
      </CSSTransition>
    );
  });

  return (
    <div className="notification-container">
      <TransitionGroup>{toastItems}</TransitionGroup>
    </div>
  );
};
