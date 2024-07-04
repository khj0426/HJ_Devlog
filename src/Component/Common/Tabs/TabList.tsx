import React, { CSSProperties, Children } from 'react';

import styled from 'styled-components';

import Flex from '@/Component/Common/Flex/Flex';
import { TabProvider } from '@/Component/Common/Tabs/TabContext';
import { TabProps } from '@/Component/Common/Tabs/tabProps';

interface TabListProps extends TabProps {
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
  fullWidth?: boolean;
}

type TabContainerProps = Pick<TabListProps, 'fullWidth' | 'margin' | 'padding'>;

const TabListContainer = styled.div<TabContainerProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: ${({ padding }) => padding ?? '0'};
  margin: ${({ margin }) => margin ?? '0'};
`;

const TabList: React.FC<TabListProps> = ({
  children,
  margin,
  padding,
  fullWidth,
}) => {
  return (
    <TabListContainer fullWidth={fullWidth} margin={margin} padding={padding}>
      <Flex
        margin={margin}
        padding={padding}
        width={fullWidth ? '100%' : 'auto'}
      >
        {Children.map(children, (child, index) => {
          return (
            <TabProvider index={index} key={index}>
              {child}
            </TabProvider>
          );
        })}
      </Flex>
    </TabListContainer>
  );
};

export default TabList;
