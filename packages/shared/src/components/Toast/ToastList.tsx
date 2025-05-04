"use client";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./index.css";
import { ToastPropsType, Toast } from "./Toast";

interface ToastListProps {
  notifications?: ToastPropsType[];
  onRequestHide?: Function;
  enterTimeout: number;
  leaveTimeout: number;
}

export const ToastList = ({
  notifications = [],
  onRequestHide,
  enterTimeout,
  leaveTimeout,
}: ToastListProps) => {
  const handleRequestHide = (toastList: ToastPropsType) => {
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
          key={"toast"}
          id={noti.id}
          type={noti.type ?? "info"}
          toastTitle={noti.title}
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
