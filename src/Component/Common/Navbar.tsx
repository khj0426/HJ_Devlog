'use client';
import Button from './Button';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from '@/app/globalAtom';

const StyledNavBarLayout = styled.nav`
  display: flex;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  gap: 15px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.body};
  align-items: center;
`;

export default function Navbar() {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);
  return (
    <StyledNavBarLayout>
      <div
        style={{
          display: 'flex',
        }}
      >
        Home
      </div>
      <Button
        label="About"
        variant="outlined"
        style={{
          fontSize: '18px',
        }}
        onClick={() =>
          setCurrentTheme((prevTheme) => {
            console.log(prevTheme);
            if (prevTheme === 'light') {
              return 'dark';
            }
            return 'light';
          })
        }
      />
    </StyledNavBarLayout>
  );
}
