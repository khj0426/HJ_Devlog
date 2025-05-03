import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import Navbar from '../Navbar';

test('Navbar의 Blog,About,Resume render works?', () => {
  const { getByText } = render(
    <RecoilRoot>
      <Navbar />
    </RecoilRoot>
  );
  expect(getByText('Blog')).toBeTruthy();
  expect(getByText('Resume')).toBeTruthy();
  expect(getByText('About')).toBeTruthy();
});

test('when Click Navbar Blog,About,Resume Link Component, the href must change ', () => {
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
