import queryString from 'query-string';
import { AtomEffect } from 'recoil';

export const QueryStringEffect =
  (_key: string): AtomEffect<any> =>
  ({ onSet }) => {
    if (typeof window !== 'undefined') {
      onSet((newValue) => {
        const location = window?.location;
        const newUrl = queryString.stringify(newValue);
        window.history.replaceState(
          null,
          '',
          `${location.pathname}${newUrl ? '?' : ''}${newUrl}`
        );
      });
    }
  };

export const initQueryObject = () => {
  if (typeof window !== 'undefined') {
    const search = window.location.search;
    const parsed = queryString.parse(search);

    return Array.isArray(parsed.keywords) ? parsed.keywords : [];
  }
};
