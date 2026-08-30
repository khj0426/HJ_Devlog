import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import Navbar from '../Navbar';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const links = [
  { to: '/', linkName: 'Blog' },
  { to: '/guestbook', linkName: 'GuestBook' },
];

test('현재 제공하는 내비게이션 링크를 렌더링한다', () => {
  const { getByRole, queryByText } = render(
    <RecoilRoot>
      <Navbar links={links} />
    </RecoilRoot>
  );

  expect(getByRole('link', { name: '글' }).getAttribute('href')).toBe('/');
  expect(getByRole('link', { name: '방명록' }).getAttribute('href')).toBe(
    '/guestbook'
  );
  expect(queryByText('About')).toBeNull();
  expect(queryByText('Resume')).toBeNull();
});
