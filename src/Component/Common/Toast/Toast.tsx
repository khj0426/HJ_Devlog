import React, { ComponentPropsWithoutRef, useRef, useEffect } from 'react';

import './index.css';
import styled from 'styled-components';

export interface ToastPropsType {
  id?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  toastTitle?: React.ReactNode;
  message?: React.ReactNode;
  timeOut?: number;
  onClick?: () => void;
  onRequestHide?: () => void;
}

interface ToastProps extends ComponentPropsWithoutRef<'div'> {
  type: 'info' | 'success' | 'warning' | 'error';
  toastTitle: React.ReactNode;
  message: React.ReactNode;
  timeOut?: number;
  onClick?: () => void;
  onRequestHide?: () => void;
}

const Notification = styled.div<Pick<ToastProps, 'type'>>`
  box-sizing: border-box;
  padding: 10px 15px;
  border-radius: 5px;
  color: #fff;
  background-color: ${(props) => {
    switch (props.type) {
      case 'info':
        return '#2f96b4';
      case 'success':
        return '#51a351';
      case 'warning':
        return '#f89406';
      case 'error':
        return '#bd362f';
      default:
        return '#ffd700';
    }
  }};
  box-shadow: 0 0 12px #999;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
  opacity: 1;
  margin-top: 10px;

  .title {
    font-size: 16px;
    line-height: 1.5;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &:hover,
  &:focus {
    opacity: 0.9;
  }
`;

export const Toast = ({
  type = 'info',
  toastTitle = null,
  message = null,
  timeOut = 5000,
  onClick,
  id,
  onRequestHide,
}: ToastProps) => {
  const timer = useRef<NodeJS.Timer | null>(null);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (onRequestHide) {
      onRequestHide();
    }
  };

  const requestHide = () => {
    if (onRequestHide) {
      onRequestHide();
    }
  };

  useEffect(() => {
    timer.current = setTimeout(requestHide, timeOut);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [id, timer.current]);

  return (
    <Notification type={type} onClick={handleClick} className="notification">
      <div role="alert">
        {toastTitle && <div className="title">{toastTitle}</div>}
        <div>{message}</div>
      </div>
    </Notification>
  );
};
