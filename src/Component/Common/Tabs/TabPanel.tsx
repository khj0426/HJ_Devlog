import React, { CSSProperties, ComponentPropsWithoutRef } from 'react';

import styled from 'styled-components';

import { usePanel } from '@/Component/Common/Tabs/TabContext';

interface TabPanelProps extends ComponentPropsWithoutRef<'div'> {
  dataTest?: string;
  active?: boolean;
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
}

const StyledTabPanel = styled.div<{
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
}>`
  margin: ${({ margin }) => margin ?? '0'};
  padding: ${({ padding }) => padding ?? '0'};
`;

const TabPanel = (props: TabPanelProps) => {
  const { isActive, index } = usePanel();
  const { children, margin, padding, active, ...rest } = props;

  return active ?? isActive ? (
    <StyledTabPanel id={`${index}`} margin={margin} padding={padding} {...rest}>
      {children}
    </StyledTabPanel>
  ) : null;
};

export default TabPanel;
