import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import Navbar from '../Navbar';

test('Navbar의 Blog,About,Resume가 성공적으로 렌더링 되는지 테스트', () => {
  const { getByText } = render(
    <RecoilRoot>
      <Navbar />
    </RecoilRoot>
  );
  expect(getByText('Blog')).toBeTruthy();
  expect(getByText('Resume')).toBeTruthy();
  expect(getByText('About')).toBeTruthy();
});

test('Navbar의 Blog,About,Resume 클릭 시 해당 주소로 잘 이동하는지 테스트', () => {
  const { getByText } = render(
    <RecoilRoot>
      <Navbar />
    </RecoilRoot>
  );

  waitFor(() => {
    fireEvent.click(getByText('Blog', { exact: false }));

    expect(window.location.pathname).toBe('/');
  });

  waitFor(() => {
    fireEvent.click(getByText('About', { exact: false }));
    expect(window.location.pathname).toBe('/about');
  });

  waitFor(() => {
    fireEvent.click(getByText('Resume', { exact: false }));

    expect(window.location.pathname).toBe('/notion/resume');
  });
});
