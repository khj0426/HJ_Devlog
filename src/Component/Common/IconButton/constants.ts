import * as IconButton from 'iconic-react';

export const allIconButtonKeys = {
  ...Object.keys(IconButton).map((string) => {
    return {
      key: string,
    };
  }),
};
