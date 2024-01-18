import React, { Component } from 'react';

import { ToastList } from '@/Component/Common/Toast/ToastList';
import ToastManager from '@/Component/Common/Toast/ToastManager';

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

  handleStoreChange = (newNoti: any[]) => {
    this.setState({ noti: newNoti });
  };

  handleRequestHide = (noti: any) => {
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
