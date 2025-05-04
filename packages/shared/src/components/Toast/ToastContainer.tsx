import React, { Component } from "react";
import { ToastManager } from ".";
import { ToastPropsType } from "./Toast";
import { ToastList } from "./ToastList";

interface ToastContainerProps {
  enterTimeout: number;
  leaveTimeout: number;
}

export class ToastContainer extends Component<ToastContainerProps> {
  state = {
    noti: [],
  };

  componentDidMount() {
    ToastManager.addChangeListener(this.handleStoreChange);
  }

  componentWillUnmount() {
    ToastManager.removeChangeListener(this.handleStoreChange);
  }

  handleStoreChange = (newNoti: ToastPropsType[]) => {
    this.setState({ noti: newNoti });
  };

  handleRequestHide = (noti: ToastPropsType) => {
    ToastManager.remove(noti);
  };

  render() {
    const { enterTimeout, leaveTimeout } = this.props;
    const { noti } = this.state;

    return (
      <ToastList
        enterTimeout={enterTimeout}
        leaveTimeout={leaveTimeout}
        notifications={noti}
        onRequestHide={this.handleRequestHide}
      />
    );
  }
}
